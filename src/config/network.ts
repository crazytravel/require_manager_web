import Axios from 'axios';
// import Cookies from 'js-cookie';

// Axios default config
Axios.defaults.baseURL = process.env.PUBLIC_URL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios default config
// Axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('RM_CSRF_ACCESS_TOKEN');
// Add a response interceptor for authenticating failure
const interceptor = Axios.interceptors.response.use(response => response, (error) => {
    // Reject promise if usual error
    if (error.response.status !== 401) {
        return Promise.reject(error);
    }
    const originalRequest = error.config;
    Axios.interceptors.response.eject(interceptor);

    // use refresh token retry
    return Axios.post('/api/auth/refresh').then(res => {
        if (res.status === 200) {
            console.log('success response: ', originalRequest);
            return Axios(originalRequest);
        }
    }).catch(err => {
        window.location.href = '/login';
        return Promise.reject(err);
    });
});
