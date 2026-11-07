import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (username, password) => {
        setLoading(true);
        try {
            const response = await login(username, password);
            setUser(response.user);
            return response;
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async (fullname, username, email, password) => {
        setLoading(true);
        try {
            const response = await register(fullname, username, email, password);
            setUser(response.user);
            return response;
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
        } catch (err) {
            console.error("Error logging out from server:", err);
        } finally {
            setUser(null);
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister, handleLogout };
}