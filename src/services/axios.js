import axios from "axios";

const axiosObj = axios.create(
    {
        baseURL: process.env.REACT_APP_BASE_URL
    }
);

export default axiosObj;