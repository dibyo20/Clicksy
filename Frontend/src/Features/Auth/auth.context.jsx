import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          {
            withCredentials: true,
          },
        );
        if (response.data && response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.log("No active session:", err.message);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
