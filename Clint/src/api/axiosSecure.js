import axios from "axios";


// export const projectBaseURL = "https://gofast-server-wheat.vercel.app"
export const projectBaseURL = "http://localhost:5000"

const axiosSecure = axios.create({
    baseURL: projectBaseURL,
    timeout: 1000,
});

export default axiosSecure;