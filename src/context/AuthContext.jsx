import { createContext, useContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext(null);

const MOCK_USER = {
  id: "1",
  name: "Linggar Ramadhan",
  email: "moh.linggar@gmail.com",
  avatar: "LR",
  role: "developer",
  joinDate: "Maret 2026",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    setUser(MOCK_USER);
  }, []);

  const updateProfile = useCallback((updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn, logout, login, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
