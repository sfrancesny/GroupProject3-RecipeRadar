// client/src/pages/Signup.jsx
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CreateUser } from '../graphql/mutations';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const [createUserMutation] = useMutation(CreateUser, {
    onCompleted: (data) => {
      setMessage(`User ${data.createUser.username} created successfully!`);
      // Redirect or additional logic here
    },
    onError: (error) => {
      setMessage(error.message);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createUserMutation({ 
      variables: { username, email, password }
    });
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
        {message && <p className="signup-message">{message}</p>}
      </form>
    </div>
  );  
};

export default SignupPage;
