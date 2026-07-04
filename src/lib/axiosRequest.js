import axios from "axios";
import { getToken } from "./token";

export const axiosRequest = axios.create({
    baseURL: 'https://test-swagger-2ph6.onrender.com/'
})



axiosRequest.interceptors.request.use((config) => {
    const token = getToken()
    if (token) {
        config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
});