import { createContext, useContext, useState, useEffect } from "react";
import axios from "../../api/axios";

// ✅ Named context export
export const AuthContext = createContext();

// ✅ useAuth() hook for easier access
export const useAuth = () => useContext(AuthContext);

// ✅ Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🧠 Extract refresh logic so other components can use it
  const refreshUser = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      console.log("🔍 Response from /auth/me:", res.data);
      setUser(res.data.user);
      setToken(storedToken);
    } catch (err) {
      console.error("❌ Failed to load user", err.response?.data || err.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
