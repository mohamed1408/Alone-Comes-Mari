import axios from "axios";
export const axiosInstance = axios.create({
    baseURL: 'http://35.162.128.183/golden_leaf/api/'
    // baseURL: 'http://localhost/other_projects/golden_leaf/api/'
});