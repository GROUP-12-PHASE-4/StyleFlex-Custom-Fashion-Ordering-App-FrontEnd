import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; 

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile((prev) => ({
        ...prev,
        username: response.data.username,
        email: response.data.email,
      }));
    } catch (err) {
      console.error("Failed to load profile", err);
      setMessage("❌ Failed to load profile.");
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      await axios.put("/api/profile", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Profile updated successfully!");
      setProfile((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      setMessage("❌ Failed to update profile.");
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Your Profile</h2>
      {message && <div className="profile-message">{message}</div>}

      <form onSubmit={handleSubmit} className="profile-form">
        <input
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
          className="profile-input"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="profile-input"
        />
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="profile-input"
        />
        <button type="submit" className="profile-button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
