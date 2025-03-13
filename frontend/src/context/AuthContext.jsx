import React, { createContext, useContext, useState } from 'react';
import api from '../services/api'

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const login = async(username,password) => {
    try{
        const response = await api.post('/login',{userName: username,password});
        localStorage.setItem('token',response.data.token);
        setIsAuthenticated(true);
        setUser({ username });
        return true;
    }catch(error){
        console.error('Login Failed: ', error);
        return false
    }
  };

  const register = async (username,emailId,password) => {
    try{
        const response = await api.post('/register',{
            userName : username,
            emailId,
            password
        });
        return true;
    }catch(error){
        console.error("Signup Failed: ",error);
        throw new Error(error.response?.data?.error || 'Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);