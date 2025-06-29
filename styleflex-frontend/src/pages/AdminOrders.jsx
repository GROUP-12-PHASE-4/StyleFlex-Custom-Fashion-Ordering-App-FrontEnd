import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css"; 

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
    <div className="admin-orders-container">
      <h2 className="admin-orders-heading">All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="admin-order-card">
          <p><strong>User ID:</strong> {order.user_id}</p>
          <p><strong>Design:</strong> {order.design?.title}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="admin-order-actions">
            <button
              className="admin-button complete"
              onClick={() => updateStatus(order.id, "completed")}
            >
              Mark as Completed
            </button>
            <button
              className="admin-button delete"
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
