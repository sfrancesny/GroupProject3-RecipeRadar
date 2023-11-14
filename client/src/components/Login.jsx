// client\src\components\Login.jsx

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LoginUser } from '../graphql/mutations';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loginUserMutation] = useMutation(LoginUser);

  const handleLogin = async () => {
    try {
      const { data } = await loginUserMutation({
        variables: { username, password },
      });

      const token = data.loginUser.token;

      // Save the token to local storage or state for future use
      localStorage.setItem('token', token);

      console.log('Login successful');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
