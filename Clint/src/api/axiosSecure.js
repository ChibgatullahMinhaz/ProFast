import axios from "axios";


export const projectBaseURL = "http://localhost:5000"

const axiosSecure = axios.create({
    baseURL: projectBaseURL,
    timeout: 1000,
});

export default axiosSecure;