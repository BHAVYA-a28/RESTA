import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('tasty_bites_admin');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (username, password) => {
    // For portfolio demonstration: simplified check
    if (username === 'admin' && password === 'tasty123') {
      const userData = { username: 'Admin User', role: 'admin' };
      setUser(userData);
      localStorage.setItem('tasty_bites_admin', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tasty_bites_admin');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
