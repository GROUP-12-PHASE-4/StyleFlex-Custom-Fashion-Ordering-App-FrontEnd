import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login";
  };

  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">StyleFlex</Link>
      </h1>
      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/orders" className="hover:underline">
              My Orders
            </Link>
            <Link to="/profile" className="hover:underline"> Profile </Link>
            <button onClick={handleLogout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
