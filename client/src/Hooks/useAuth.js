const useAuth = () => {
    const isAuthenticated = async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const jwtDecode = (await import('jwt-decode')).default;
            const decodedToken = jwtDecode(token);
            // Add your token expiration logic here
    
            return true; // or false based on the token expiration
        } catch (error) {
            console.error('Error loading jwt-decode:', error);
            return false;
        }
    };

    return {
        isAuthenticated
    };
};

export default useAuth;
