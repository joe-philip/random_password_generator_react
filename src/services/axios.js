import axios from "axios";

const axiosObj = axios.create();

axiosObj.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export default axiosObj;