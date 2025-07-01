import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../App.css";

function DesignGallery() {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await API.get("/designs");
        setDesigns(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch designs");
      }
    };
    fetchDesigns();
  }, []);

  return (
    <div className="gallery-container">
      <h1 className="gallery-title">Explore Designs</h1>
      {error && <p className="gallery-error">{error}</p>}
      <div className="gallery-grid">
        {designs.map((design) => (
          <div key={design.id} className="design-card">
            <img
              src={design.image || "https://via.placeholder.com/300"}
              alt={design.title}
              className="design-image"
            />
            <h3 className="design-title">{design.title}</h3>
            <p className="design-category">{design.category}</p>
            <p className="design-description">{design.description}</p>
            <Link
              to={`/order/${design.id}`}
              className="order-button"
            >
              Order Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignGallery;
