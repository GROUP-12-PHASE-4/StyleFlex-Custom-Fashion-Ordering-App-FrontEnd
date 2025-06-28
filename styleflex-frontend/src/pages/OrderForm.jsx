import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api"; 

function OrderForm() {
  const { id } = useParams();
  const [design, setDesign] = useState(null);
  const [size, setSize] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [error, setError] = useState(null);
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
    try {
      const res = await API.post(
        "/orders",
        {
          design_id: parseInt(id),
          size,
          measurements,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Order failed.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Order Design</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {design && (
        <div className="mb-4">
          <img
            src={design.image || "https://via.placeholder.com/300"}
            alt={design.title}
            className="w-full h-48 object-cover rounded mb-2"
          />
          <h2 className="text-xl font-semibold">{design.title}</h2>
          <p className="text-sm text-gray-700">{design.category}</p>
          <p className="text-sm text-gray-600">{design.description}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Size:
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </label>

        <label className="block mb-2">
          Measurements:
          <textarea
            value={measurements}
            onChange={(e) => setMeasurements(e.target.value)}
            required
            className="mt-1 block w-full border px-3 py-2 rounded"
          />
        </label>

        <button
          type="submit"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
        >
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
