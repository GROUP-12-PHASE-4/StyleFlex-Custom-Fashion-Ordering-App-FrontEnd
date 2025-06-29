import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../App.css"; 

function OrderForm() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [size, setSize] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    API.get("/designs")
      .then((res) => {
        const found = res.data.find((d) => d.id === parseInt(id));
        if (found) setDesign(found);
        else setError("Design not found.");
      })
      .catch(() => setError("Failed to load design."));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await API.post(
        "/orders",
        {
          design_id: parseInt(id),
          size: size.trim(),
          measurements: measurements.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      const msg = err.response?.data?.message || "Order failed.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-form-container">
      <h1 className="order-form-title">Order Design</h1>

      {error && <p className="error-message">{error}</p>}

      {design ? (
        <>
          <div className="order-form-design">
            <img
              src={design.image || "https://via.placeholder.com/300"}
              alt={design.title}
              className="order-form-image"
            />
            <h2 className="order-form-subtitle">{design.title}</h2>
            <p className="order-form-meta">{design.category}</p>
            <p className="order-form-description">{design.description}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="order-form-label">
              Size:
              <input
                type="text"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
                className="order-form-input"
              />
            </label>

            <label className="order-form-label">
              Measurements:
              <textarea
                value={measurements}
                onChange={(e) => setMeasurements(e.target.value)}
                required
                className="order-form-textarea"
              />
            </label>

            <button
              type="submit"
              className={`order-form-button ${loading ? "disabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Order"}
            </button>
          </form>
        </>
      ) : (
        !error && <p className="order-form-loading">Loading design...</p>
      )}
    </div>
  );
}

export default OrderForm;
