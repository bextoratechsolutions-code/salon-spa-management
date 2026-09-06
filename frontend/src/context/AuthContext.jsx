import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========================================
  // CHECK EXISTING LOGIN SESSION
  // ========================================

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Invalid stored user data");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }

    setLoading(false);
  }, []);

  // ========================================
  // ADMIN LOGIN
  // ========================================

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, admin } = response.data;

      if (!token) {
        throw new Error("Authentication token not received");
      }

      // Save JWT token
      localStorage.setItem("token", token);

      // Save admin information
      if (admin) {
        localStorage.setItem("user", JSON.stringify(admin));
        setUser(admin);
      } else {
        // Fallback agar backend admin object return na kare
        const fallbackUser = {
          email,
          role: "admin",
        };

        localStorage.setItem("user", JSON.stringify(fallbackUser));
        setUser(fallbackUser);
      }

      return response.data;
    } catch (error) {
      console.error(
        "Login Error:",
        error.response?.data || error.message
      );

      throw error;
    }
  };

  // ========================================
  // LOGOUT
  // ========================================

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
  };

  // ========================================
  // CONTEXT PROVIDER
  // ========================================

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// useAuth HOOK
// ========================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};