import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `/api/orders/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchOrders();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to delete order", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="border p-3 mb-3 shadow">
          <p><strong>User ID:</strong> {order.user_id}</p>
          <p><strong>Design:</strong> {order.design?.title}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="mt-2 flex gap-2">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => updateStatus(order.id, "completed")}
            >
              Mark as Completed
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded"
              onClick={() => deleteOrder(order.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;
