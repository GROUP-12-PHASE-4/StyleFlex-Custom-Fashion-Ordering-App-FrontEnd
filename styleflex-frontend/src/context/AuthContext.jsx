import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    accessToken: null,
    user: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("access_token"); // 🔄 MATCH your token name from other files
    if (token) {
      setAuth((prev) => ({
        ...prev,
        isAuthenticated: true,
        accessToken: token,
      }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
