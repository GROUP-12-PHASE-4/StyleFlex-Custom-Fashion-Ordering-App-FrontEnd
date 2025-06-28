import { useState } from 'react';
import API from '../services/api';

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
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md p-6 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.username}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm text-center text-green-600">{message}</p>
      )}
      {error && (
        <p className="mt-4 text-sm text-center text-red-500">{error}</p>
      )}
    </div>
  );
}

export default Signup;
