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
    <ssName="text-red-500 text-center">{error}</p>}
      