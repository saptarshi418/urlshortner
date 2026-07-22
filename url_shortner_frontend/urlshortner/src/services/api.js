import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("access");

    if (token) {
        config.headers.Authorization = `JWT ${token}`; // or Bearer
    }

    return config;
});



api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("auth/jwt/refresh/")
        ) {
            originalRequest._retry = true;

            const refresh = localStorage.getItem("refresh");

            if (!refresh) {
                return Promise.reject(error);
            }

            try {
                const response = await axios.post(
                    `${API_BASE_URL}auth/jwt/refresh/`,
                    { refresh }
                );

                const newAccess = response.data.access;

                localStorage.setItem("access", newAccess);

                originalRequest.headers.Authorization = `JWT ${newAccess}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("access");
                localStorage.removeItem("refresh");

                
                return Promise.reject(refreshError);
            }
        }

        console.log(error.response?.data || error.message);

        return Promise.reject(error);
    }
);

export default api;