import { createContext, useContext, useState, useEffect } from "react";
import api from "../../api";
import { toast } from "react-toastify"; // ✅ correct

// ✅ Named context export
export const AuthContext = createContext();

// ✅ useAuth() hook for easier access
export const useAuth = () => useContext(AuthContext);

// ✅ Context Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // 🧠 Extract refresh logic so other components can use it
  const refreshUser = async () => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      console.log("❌ No token found in localStorage");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Refreshing user data with token:", storedToken);
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      
      if (res.data.success && res.data.user) {
        console.log("✅ User data refreshed:", res.data.user);
        const userData = res.data.user;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setToken(storedToken);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("❌ Failed to refresh user:", err.response?.data || err.message);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.error("Session expired. Please log in again.");
    } finally {
      setLoading(false);
    }
  };

  // Initialize auth state
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    
    if (storedToken && storedUser) {
      console.log("🔄 Initializing auth state from localStorage");
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      refreshUser(); // Refresh to get latest data
    } else {
      console.log("❌ No stored auth data found");
      setLoading(false);
    }
  }, []);

  // Set up token persistence
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [token]);

  const login = async (userData, authToken) => {
    console.log("🔑 Logging in user:", userData.email);
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    toast.success("Logged in successfully");
  };

  const logout = () => {
    console.log("🔒 Logging out user");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken(null);
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        setUser, 
        token, 
        setToken, 
        loading, 
        logout, 
        login,
        refreshUser 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
