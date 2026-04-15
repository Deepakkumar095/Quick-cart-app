import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products?limit=200");
        setProducts(res.data.products);
      }
      catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    getProducts();

  }, []);


  // Check if cart is empty
  const isCartEmpty = Object.values(cartItems).every((val) => val === 0);

  // Calculate total price
  const getTotalAmount = () => {
    let total = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = products.find(
          (p) => String(p.id) === String(item)
        );

        if (product) {
          total += cartItems[item] * product.price;
        }
      }
    }
    return total.toFixed(2);
  };

  return (
    <div className="cart">

      {/* Empty Cart */}
      {isCartEmpty ? (
        <h1>Your Cart is Empty 🛒</h1>
      ) : (
        <>
          <h1>Your Cart</h1>

          {/* Cart Items */}
          <div className="cart">
            {products.map((product) => {
              if (cartItems[product.id] > 0) {
                return <CartItem key={product.id}
                  data={{
                    id: product.id,
                    productName: product.title,
                    price: product.price,
                    productImage: product.thumbnail,

                  }}

                />;
              }
              return null;
            })}
          </div>

          {/*Total + Checkout */}
          <div className="checkout">
            <h2>Total: ${getTotalAmount()}</h2>

            <button onClick={() => navigate("/")}>
              Continue Shopping
            </button>

            <button onClick={() => navigate("/checkout")}>
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};