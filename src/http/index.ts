import axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' 
                ? 'http://106.13.180.104/' : 'http://127.0.0.1:80/';
// const baseURL = 'http://127.0.0.1:80/';
axios.defaults.baseURL = baseURL + 'api'; 
export default function Http(method, url, data = {}) {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    let promise = axios({
        method,
        url,
        data,
        cancelToken: source.token,
    })
    .catch(err => {
        console.log(err);
        // cookie过期
        if (err.response.status === 401 && window.location.pathname !== '/') {
            window.location.replace('/')
        }
        return Promise.reject(err);
    })
    return {cancel: source.cancel, promise};
}