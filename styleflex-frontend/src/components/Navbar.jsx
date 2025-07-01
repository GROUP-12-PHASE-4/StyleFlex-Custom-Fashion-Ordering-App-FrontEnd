import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../App.css"; 

function Navbar() {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <h1 className="navbar-title">
        <Link to="/">StyleFlex</Link>
      </h1>
      <div className="navbar-links">
        {auth?.accessToken ? (
          <>
            <Link to="/designs">Designs</Link>
            <Link to="/orders">My Orders</Link>
            <Link to="/profile">Profile</Link>
            <button onClick={logout} className="navbar-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
