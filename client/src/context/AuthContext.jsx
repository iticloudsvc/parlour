import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('glamour_token') || null);
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('glamour_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'

  useEffect(() => {
    if (token) {
      localStorage.setItem('glamour_token', token);
    } else {
      localStorage.removeItem('glamour_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('glamour_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('glamour_user');
    }
  }, [user]);

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    setIsAuthModalOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('glamour_token');
    localStorage.removeItem('glamour_user');
  };

  const openLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setIsAuthModalOpen(true);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAdmin,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        openLogin,
        openSignup,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
