// src/hooks/useAuth.js
const useAuth = () => {
    const isAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
  
        let jwtDecode;
        try {
            jwtDecode = (await import('jwt-decode')).default;
        } catch (error) {
            console.error('Error loading jwt-decode:', error);
            return false;
        }
  
        const decodedToken = jwtDecode(token);
        // Add your token expiration logic here
  
        return true; // or false based on the token expiration
    };
  
    return {
        isAuthenticated
    };
  };
  
  export default useAuth;
  