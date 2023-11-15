// client\src\pages\LoginPagejsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUser } from '../graphql/mutations';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const [loginUserMutation] = useMutation(LoginUser);

  const handleLogin = async () => {
    try {
      navigate('/'); // Navigate to the root URL
      const { data } = await loginUserMutation({
        variables: { username, password },
      });
  
      const token = data.loginUser.token;
      localStorage.setItem('token', token); // Save token to local storage
      console.log('Login successful');
      setMessage('Login successful!');
      
    } catch (error) {
      console.error('Login error:', error.message);
      setMessage('Login failed: ' + error.message);
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
        <button className='submit-button' type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
      <p className="signup-prompt">
        Don't have an account? <Link to="/signup">Sign up here</Link>.
      </p>
    </div>
  );
}

export default Login;
