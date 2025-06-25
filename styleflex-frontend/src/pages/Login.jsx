import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
   n", data.access_token); // Match token name in other components

      setAuth({
        isAuthenticated: true,
        accessToken: data.access_token,
        user: data.user || null, // if backend returns user info
      });

    