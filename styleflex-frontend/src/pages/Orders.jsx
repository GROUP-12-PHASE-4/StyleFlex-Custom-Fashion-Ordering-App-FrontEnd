import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css"; 

function Orders() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          "https://styleflex-custom-fashion-ordering-app.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );

        if (!res.ok) {
          const msg = await res.json();
          throw new Error(msg.message || "Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (auth?.accessToken) {
      fetchOrders();
    }
  }, [auth?.accessToken]);

  const handleMakeOffer = (orderId) => {
    console.log("Make offer for order:", orderId);
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
                <p className="order-measurements">
                  <strong>Measurements:</strong> {order.measurements}
                </p>
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
