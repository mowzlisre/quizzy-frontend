import axios from "axios";

const base_url = "http://localhost:8000";

const API = axios.create({
    baseURL: base_url, 
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const verifyAPI = () => API.get("verify-token");
export const loginAPI = (username, password) => API.post("login", { username, password });
export const refreshTokenAPI = (refresh) => API.post("token/refresh", { refresh });
export const logoutAPI = async () => {
    const refresh = localStorage.getItem("refresh_token");
    if (!refresh) { return; }
    try { return await API.post("logout", { refresh }); }
    catch (error) {}
};

export const projectsViewAPI = () => API.get("api/projects");

export default API;
