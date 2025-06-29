import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-800 p-4 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link to="/">StyleFlex</Link>
      </h1>
      <div className="space-x-4">
        {auth?.accessToken ? (
          <>
            <Link to="/orders" className="hover:underline">
              My Orders
            </Link>
            <Link to="/profile" className="hover:underline">
              Profile
            </Link>
            <button onClick={logout} className="hover:underline">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
