import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { auth } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://your-backend-url.onrender.com/api/orders", {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`, 
          },
        });

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

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Orders</h2>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !error && <p>No orders yet.</p>}

      <ul className="space-y-4">
        {orders.map((order) => (
          <li key={order.id} className="border p-4 rounded shadow">
            <p><strong>Design:</strong> {order.design?.title}</p>
            <p><strong>Size:</strong> {order.size || "N/A"}</p>
            <p><strong>Measurements:</strong> {order.measurements}</p>
            <p><strong>Status:</strong> <span className="text-blue-600">{order.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;
