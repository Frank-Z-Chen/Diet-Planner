import axios from "axios";
const request = axios.create({
    baseURL: 'http://localhost:8000/',   
    timeout: 20000
})
request.interceptors.request.use((config) => {


    config.headers.Authorization = window.token
    return config
}, function (error) {

    return Promise.reject(error)
})
export default request