import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Profile</h2>
      {message && <div className="mb-2 text-sm">{message}</div>}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
          value={profile.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full border p-2 rounded"
        />
        <input
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleChange}
          placeholder="New Password (optional)"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
