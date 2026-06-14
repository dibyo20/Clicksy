import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: `${API_URL}/auth`,
    withCredentials: true,
});

export async function login(username, password) {
    const response = await api.post("/login", { username, password });
    return response.data;
};

export async function register(fullname, username, email, password) {
    const response = await api.post("/register", { fullname, username, email, password });
    return response.data;
};