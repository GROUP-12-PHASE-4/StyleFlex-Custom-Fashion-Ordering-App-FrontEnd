import { useState } from 'react';
import API from '../services/api';
import '../App.css'; 

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      console.log("Submitting signup:", formData);
      const res = await API.post('/register', formData);
      setMessage(res.data.message || 'Signup successful!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Signup failed.');
    }
  }

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          name="username"
          placeholder="Username"
          className="signup-input"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="signup-input"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="signup-input"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>

      {message && <p className="signup-success">{message}</p>}
      {error && <p className="signup-error">{error}</p>}
    </div>
  );
}

export default Signup;
