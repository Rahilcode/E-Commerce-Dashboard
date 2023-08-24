import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/register");
  };

  return (
    <div className="nav">
      <img
        src="https://images.pexels.com/photos/3472980/pexels-photo-3472980.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="logo"
      />

      {auth ? (
        <ul>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add-products">Add-Products</Link>
          </li>
          <li>
            <Link to="/update-products">Update Products</Link>
          </li>
          <li>
            <Link onClick={logout} to="/register">
              logout ({JSON.parse(auth).user.name})
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <div className="auth">
            <li>
              <Link to="/register">Sign up</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>
          </div>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
