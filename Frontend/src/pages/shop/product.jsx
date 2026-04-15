import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/createSlice";

export const Product = (props) => {
  const { id, productName, price, productImage } = props.data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartItems);

  return (
    <div className="product">
      <img
        src = {productImage}
        onClick = {() => navigate(`product/${id}`)}
        style = {{ cursor: "pointer" }}
      />
      <div className = "description">
        <p>
          <b>{productName}</b>
        </p>
        <p> ${price}</p>
      </div>
      <button className = "addToCartBttn" onClick={() => dispatch(addToCart(id))}>
        Add To Cart
      </button>
    </div>
  );
};
