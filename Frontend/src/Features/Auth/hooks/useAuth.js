import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async (username, password) => {
        setLoading(true);
        const response = await login(username, password);
        setUser(response);
        console.log(response);
        setLoading(false);
    }

    const handleRegister = async (fullname, username, email, password) => {
        setLoading(true);
        const response = await register(fullname, username, email, password);
        setUser(response);
        console.log(response);
        setLoading(false);
    }

    return { user, loading, handleLogin, handleRegister };
}