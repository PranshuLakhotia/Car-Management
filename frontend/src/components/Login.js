import React, { useState } from 'react';
import api from '../api';  // Import the default api object

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, password };
    try {
      const data = await api.loginUser(credentials);  // Access loginUser via the api object
      setSuccess('Login successful!');
      setError('');
      console.log('Token:', data.token);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
