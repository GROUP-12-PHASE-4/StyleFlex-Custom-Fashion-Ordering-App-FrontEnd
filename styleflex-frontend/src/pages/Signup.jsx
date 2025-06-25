import { useState } from 'react';
import API from '../services/api';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

 const [message, setMessage] = useState('');

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await API.post('/signup', formData);
      setMessage(res.data.message || 'Signup successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed.');
    }
  }
