import { useEffect, useState } from "react";
import API from "../services/api";
import "../App.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await API.get("/profile");
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
      await API.put("/profile", profile);
      setMessage("✅ Profile updated successfully!");
      setProfile((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update profile.");
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
