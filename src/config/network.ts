import Axios from 'axios';
import Cookies from 'js-cookie';

// Axios default config
Axios.defaults.baseURL = process.env.PUBLIC_URL;
Axios.defaults.withCredentials = true;
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Axios default config
Axios.defaults.headers.common['X-CSRF-TOKEN'] = Cookies.get('RM_CSRF_ACCESS_TOKEN');
// Add a response interceptor for authenticating failure
Axios.interceptors.response.use(response => response, (error) => {
    if (error.response?.status === 401) {
        console.error('auth failed!')
        window.location.href = process.env.PUBLIC_URL + '/login';
    }
    return Promise.reject(error);
});