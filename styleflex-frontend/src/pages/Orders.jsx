import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../App.css";

function Orders() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [offerSent, setOfferSent] = useState(false);
  const [randomDesigns, setRandomDesigns] = useState([]);

  const UNSPLASH_ACCESS_KEY = "SHGzlyVn6muY6ZN_JJi3_OKoa09hvSz_XsCCMeeWnkY";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get("/orders");
        if (res.status !== 200) {
          throw new Error(res.data.message || "Failed to fetch orders");
        }
        setOrders(res.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (auth?.accessToken) {
      fetchOrders();
    }
  }, [auth?.accessToken]);

  const fetchRandomDesigns = async () => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=fashion+clothes&per_page=12&client_id=${UNSPLASH_ACCESS_KEY}`
      );
      const data = await res.json();
      setRandomDesigns(data.results || []);
    } catch (err) {
      console.error("Error fetching designs:", err);
    }
  };

  const handleMakeOffer = async (orderId) => {
    const offerPriceInput = prompt("Enter your offer price:");

    if (!offerPriceInput || isNaN(offerPriceInput) || Number(offerPriceInput) <= 0) {
      alert("Invalid price. Please enter a positive number.");
      return;
    }

    const notesInput = prompt("Optional: Add any notes for this offer (or leave blank):") || "";

    try {
      const res = await API.post(`/orders/${orderId}/offer`, {
        offer_price: Number(offerPriceInput),
        notes: notesInput,
      });

      if (res.status === 200) {
        alert("✅ Offer sent successfully!");
        setOfferSent(true);
        fetchRandomDesigns();
      } else {
        alert("❌ Failed to send offer: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error making offer:", error);
      alert("❌ Error sending offer. Please try again.");
    }
  };

  if (offerSent) {
    return (
      <div className="orders-container">
        <h1 className="orders-title">Discover New Fashion Designs</h1>
        <div className="orders-grid">
          {randomDesigns.length === 0 ? (
            <p>Loading designs...</p>
          ) : (
            randomDesigns.map((design) => (
              <div key={design.id} className="order-card">
                <img
                  src={design.urls.small}
                  alt={design.alt_description || "Fashion design"}
                  className="order-image"
                />
                <h2 className="order-title">{design.description || "Fashion Design"}</h2>
                <p className="order-meta">By: {design.user.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 && !error ? (
        <p className="orders-empty">No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => {
            let measurements = order.measurements;
            try {
              if (typeof measurements === "string") {
                measurements = JSON.parse(measurements);
              }
            } catch (e) {
              console.error("Invalid measurements JSON", e);
              measurements = null;
            }

            return (
              <div key={order.id} className="order-card">
                <h2 className="order-title">{order.design?.title || "No Design Info"}</h2>
                <p className="order-meta">
                  Size: {order.size} | Status:{" "}
                  <span className="order-status">{order.status}</span>
                </p>
                <p className="order-meta">
                  Ordered on: {new Date(order.created_at).toLocaleString()}
                </p>

                {measurements && (
                  <div className="order-measurements">
                    <strong>Measurements:</strong>
                    <ul>
                      {Object.entries(measurements).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  className="order-button"
                  onClick={() => handleMakeOffer(order.id)}
                >
                  Make Offer
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;
