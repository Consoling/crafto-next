import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

const useAuthToken = () => {
  const [isValidToken, setIsValidToken] = useState<boolean>(false);

  useEffect(() => {
    const checkTokenValidity = () => {
      try {
        const token = localStorage.getItem('auth_token');
        console.log(token)
        
        if (!token) {
          setIsValidToken(false);
          return;
        }

       
        const decoded = jwt.decode(token) as { exp?: number };
        
        if (!decoded || !decoded.exp) {
          setIsValidToken(false);
          return;
        }

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        const isExpired = decoded.exp < currentTime;
        
        setIsValidToken(!isExpired);
      } catch (error) {
        console.error('Token validation error:', error);
        setIsValidToken(false);
      }
    };

    checkTokenValidity();
    
    const handleStorageChange = () => checkTokenValidity();
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return isValidToken;
};

export default useAuthToken;