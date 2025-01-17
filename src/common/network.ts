import axios from 'axios';
// import Cookies from 'js-cookie';

// Axios default config
axios.defaults.baseURL = process.env.PUBLIC_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
// Axios default config
// Axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('RM_CSRF_ACCESS_TOKEN');
// Add a response interceptor for authenticating failure
const interceptor = axios.interceptors.response.use(
    (response) => response,
    (error) => {
        // Reject promise if usual error
        if (error.response.status !== 401) {
            return Promise.reject(error);
        }
        const originalRequest = error.config;
        axios.interceptors.response.eject(interceptor);

        // use refresh token retry
        return axios
            .post('/api/auth/refresh')
            .then((res) => {
                if (res.status === 200) {
                    console.log('success response: ', originalRequest);
                    return axios(originalRequest);
                }
            })
            .catch((err) => {
                console.log('错误', err.response.status === 401);
                if (err.response.status === 401) {
                    axios.post('/api/auth/logout').finally(() => {
                        localStorage.removeItem('logged_in');
                        localStorage.removeItem('id');
                        localStorage.removeItem('username');
                        localStorage.removeItem('nick_name');
                        localStorage.removeItem('authorities');
                        window.location.href = '/sign-in';
                    });
                } else {
                    return Promise.reject(err);
                }
            });
    },
);

export default axios;
