import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function DesignGallery() {
  const [designs, setDesigns] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const res = await fetch("https://styleflex-custom-fashion-ordering-app.onrender.com/api/designs");
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