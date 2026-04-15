import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { useSelector } from "react-redux";
import "./navbar.css";

export const Navbar = () => {
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cartItems);

  //Auth check
  const isAuth = localStorage.getItem("isAuth") === "true";

  // Total cart count
  const getTotalCartCount = () => {
    let totalCount = 0;

    for (const item in cartItems) {
      totalCount += cartItems[item] || 0;
    }
    return totalCount;
  };

  const cartCount = getTotalCartCount();


  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    navigate("/login"); // better than reload
  };

  return (
    <div className="navbar">
      <div className="links">
        <h1>QuickCart</h1>
 
        {isAuth && (
          <>
            <Link to="/">Shop</Link>
            <Link to="/contact">Contact</Link>

            <Link to="/cart" className="cartLink">
              <ShoppingCart size={32} />
              {cartCount > 0 && (<span className="cartCount">{cartCount}</span>)}

            </Link>
            
          </>
        )}

        {isAuth && (
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        )}
        
      </div>
    </div>
  );
};