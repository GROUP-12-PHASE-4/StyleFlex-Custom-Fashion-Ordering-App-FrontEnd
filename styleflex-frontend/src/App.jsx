import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import DesignGallery from "./pages/DesignGallery";
import OrderForm from "./pages/OrderForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/designs" element={<DesignGallery />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/order/:id" element={<OrderForm />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
