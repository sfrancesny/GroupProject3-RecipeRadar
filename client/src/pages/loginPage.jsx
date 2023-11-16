// client\src\pages\LoginPagejsx

import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from '../graphql/mutations';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const [loginUserMutation, { loading, error }] = useMutation(LoginUser);

  useEffect(() => {
    if (isFormValid && !loading) {
      loginUserMutation({
        variables: { username, password },
      })
        .then(({ data }) => {
          const token = data.loginUser.token;
          localStorage.setItem('token', token);
          console.log('Login successful');
          navigate('/'); // Navigate to a different route after successful login
        })
        .catch((error) => {
          console.error('Login error:', error);
          setMessage('Login failed: ' + error.message);
        });
    }
    // Reset form validation
    setIsFormValid(false);
  }, [isFormValid, loginUserMutation, loading, username, password, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // Simple form validation
    if (username && password) {
      setIsFormValid(true);
    } else {
      setMessage('Please enter both username and password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className='submit-button' type="submit" disabled={loading}>Login</button>
        {message && <p>{message}</p>}
        {error && <p>Error: {error.message}</p>}
      </form>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default Login;
