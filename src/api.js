import axios from "axios";

const base_url = "http://localhost:8000";

const API = axios.create({
    baseURL: base_url, 
});

const API_MP = axios.create({
    baseURL: base_url, 
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

API_MP.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        config.headers["Content-Type"] = "multipart/form-data"
    }
    return config;
});


export const verifyTokenAPI = () => API.get("verify-token");
export const loginAPI = (username, password) => API.post("login", { username, password });
export const refreshTokenAPI = (refresh) => API.post("token/refresh", { refresh });
export const logoutAPI = async () => {
    const refresh = localStorage.getItem("refresh_token");
    localStorage.removeItem("access_token")
    if (!refresh) { return  ; }
    try { return await API.post("logout", { refresh }); }
    catch (error) {}
};

export const projectsViewAPI = () => API.get("api/projects");
export const projectViewAPI = (uuid) => API.get(`api/project/${uuid}`);
export const projectAssessmentsViewAPI = (uuid) => API.get(`api/project/${uuid}/assessments`);
export const assessmentViewAPI = (uuid) => API.get(`/api/assessment/${uuid}`);
export const createNewAssessment = (data) => API.post('/api/assessment/new', data);
export const createNewAttempt = (data) => API.post('/api/attempt/new', data);
export const startAttempt = (data) => API.post('/api/attempt/start', data);
export const materialUpload = (uuid, data) => API_MP.post(`/api/project/${uuid}/upload`, data);
export const materialDelete = (uuid, id) => API.post(`/api/project/${uuid}/delete`, {id});

export function handleAPIErrors (error, navigate){
    if(error.status === 401){
        navigate('/login')
      }
}