import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "../App.css";

function Orders() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

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

  const handleMakeOffer = async (orderId) => {
    console.log("Make Offer clicked for order:", orderId);

    const offerPrice = prompt("Enter your offer price:");

    if (!offerPrice || isNaN(offerPrice) || Number(offerPrice) <= 0) {
      alert("Invalid price. Please enter a positive number.");
      return;
    }

    try {
      const res = await API.post(`/orders/${orderId}/offers`, {
        price: Number(offerPrice)
      });

      if (res.status === 200) {
        alert("✅ Offer sent successfully!");
      } else {
        alert("❌ Failed to send offer: " + (res.data?.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error making offer:", error);
      alert("❌ Error sending offer. Please try again.");
    }
  };

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      {error && <p className="error-message">{error}</p>}
      {orders.length === 0 && !error ? (
        <p className="orders-empty">No orders found</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2 className="order-title">
                {order.design?.title || "No Design Info"}
              </h2>
              <p className="order-meta">
                Size: {order.size} | Status:{" "}
                <span className="order-status">{order.status}</span>
              </p>
              <p className="order-meta">
                Ordered on: {new Date(order.created_at).toLocaleString()}
              </p>
              {order.measurements && (
                <div className="order-measurements">
                  <strong>Measurements:</strong>
                  <ul>
                    {Object.entries(order.measurements).map(([key, value]) => (
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
