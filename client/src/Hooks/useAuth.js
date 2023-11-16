// src/hooks/useAuth.js
const useAuth = () => {
    const isAuthenticated = () => {
      const token = localStorage.getItem('token');
      return !!token; // Returns true if token exists, false otherwise
    };
  
    return {
      isAuthenticated
    };
  };
  
  export default useAuth;
  