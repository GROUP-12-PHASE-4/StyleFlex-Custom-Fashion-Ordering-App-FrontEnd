import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DesignGallery() {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch("https://your-backend-url.onrender.com/api/designs");
        if (!res.ok) {
          const msg = await res.json();
          throw new Error(msg.message || "Failed to fetch designs");
        }
        const data = await res.json();
        setDesigns(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchDesigns();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Explore Designs</h1>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {designs.map((design) => (
          <div key={design.id} className="border rounded-lg shadow p-4">
            <img
              src={design.image || "https://via.placeholder.com/300"}
              alt={design.title}
              className="w-full h-48 object-cover rounded mb-3"
            />
            <h3 className="text-xl font-semibold">{design.title}</h3>
            <p className="text-sm text-gray-600">{design.category}</p>
            <p className="text-sm mt-2">{design.description}</p>
        