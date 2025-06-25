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
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      {error && <p className="text-red-500">{error}</p>}
      {orders.length === 0 && !error ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded p-4 shadow hover:bg-gray-50 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {order.design?.title || "No Design Info"}
              </h2>
              <p className="text-sm text-gray-600">
                Size: {order.size} | Status:{" "}
                <span className="font-medium">{order.status}</span>
              </p>
              <p className="text-sm text-gray-600">
                Ordered on: {new Date(order.created_at).toLocaleString()}
              </p>
              {order.measurements && (
                <p className="text-sm mt-2">
                  <strong>Measurements:</strong> {order.measurements}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
