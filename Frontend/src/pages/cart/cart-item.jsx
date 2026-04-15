import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, updateCartItemCount } from "../../redux/createSlice";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems);
  const itemCount = cartItems[id] || 0;

  return (
    <div className = "cartItem">
      <img src = {productImage} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className = "countHandler">
          <button onClick={() => dispatch(removeFromCart(id))}> - </button>
          <input
            value={itemCount}
            onChange={(e) =>{
              let value = Number(e.target.value)

              if(value < 1) value = 1;
              if(value > 99) value = 99;

              dispatch(updateCartItemCount({itemId: id, newAmount: value,}));

            }}
          />
          <button onClick={() => dispatch(addToCart(id))}> + </button>
        </div>
        <button className = "removeBtn" onClick={() => dispatch(removeFromCart(id))}>Remove</button>

      </div>

    </div>
  );
};
