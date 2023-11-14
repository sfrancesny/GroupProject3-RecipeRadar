// client/src/pages/loginPage.jsx
import React from 'react';
import Login from '../components/Login'; // Import the Login component

const LoginPage = () => {
    return (
        <div>
            <h1>Login</h1>
            <Login />  {/* Embed the Login component */}
        </div>
    );
};

export default LoginPage;
