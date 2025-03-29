'use client'


import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  authToken: string;
  isAuthenticated: boolean;
  setAuthToken: (token: string) => void;
  logout: () => void;
}

const AuthedContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authToken, setAuthToken] = useState<string>(() => {
    return localStorage.getItem('access_token') || '';
  });
  const router = useRouter();

  const isAuthenticated = !!authToken; 

  const logout = () => {
    setAuthToken(''); 
    localStorage.removeItem('access_token'); 
    router.push('/sign-in')
  };

  useEffect(() => {

    if (authToken) {
      localStorage.setItem('access_token', authToken);
    } else {
      localStorage.removeItem('access_token');
    }
  }, [authToken]);

  return (
    <AuthedContext.Provider value={{ authToken, isAuthenticated, setAuthToken, logout }}>
      {children}
    </AuthedContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthedContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
