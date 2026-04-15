// ProductDetails.js - Enhanced Component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/createSlice";
import { fetchProductById } from "../../services/api";
import "./productDetails.css";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [id]);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product.id));
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const generateStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    let stars = "★".repeat(fullStars);
    if (hasHalfStar) stars += "½";
    stars += "☆".repeat(5 - fullStars - (hasHalfStar ? 1 : 0));
    return stars;
  };

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="loadingSpinner"></div>
        <div className="loadingText">Loading amazing product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="notFound">
        <h2>Product not found </h2>
        <p>The item you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="productWrapper">

      <div className="productCard">

        {/* IMAGE */}
        <div className="imageBox">
          <img
            src={product.images?.[0] || product.image}
            alt={product.title}
          />

          {/* Price shown on bottom of image */}
          <div className="imagePriceBar">
            <span className="imagePriceLabel">${product.price.toFixed(2)}</span>
            <div className="imageCartActions">
              <button className="buyNowBtn" onClick={handleAddToCart}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* details */}
        <div className="contentBox">

          {/* category badge */}
          <div className="categoryBadge">{product.category}</div>

          <h1>{product.title}</h1>

          {/* Rating */}
          <div className="rating">
            <span className="stars">{generateStars(product.rating || 4.9)}</span>
            <span className="ratingText">
              ({product.reviewCount || "5k"} Reviews)
            </span>
          </div>

          {/* Description */}
          <div className="descSection">
            <p className="descLabel">Description:</p>
            <p className="desc">{product.description}</p>
          </div>

          {/* Product Details list */}
          <div className="productDetailsList">
            <p className="detailsLabel">Product details:</p>
            <ul>
              <li><b>Category:</b> {product?.category}</li>

              <li><b>Brand:</b> {product?.brand || "No Brand"}</li>

              <li><b>Weight:</b> {product?.weight ? `${product.weight}g` : "N/A"}</li>

              <li>
                <b>Dimensions:</b>{" "}
                {product?.dimensions
                  ? `${product.dimensions.width} ${product.dimensions.height} × ${product.dimensions.depth}`
                  : "N/A"}
              </li>

              <li><b>Stock:</b> {product?.availabilityStatus || "In Stock"}</li>

              <li><b>Warranty:</b> {product?.warrantyInformation || "No Warranty"}</li>

              <li><b>Shipping:</b> {product?.shippingInformation || "Standard Delivery"}</li>
            </ul>
          </div>

          {/* Quantity */}
          <div className="quantitySection">
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => handleQuantityChange(1)}>+</button>
          </div>

          {/* Add to Cart Button */}
          <button className="addBtn" onClick={handleAddToCart}>
            Add to Cart • ${(product.price * quantity).toFixed(2)}
          </button>

        </div>

      </div>

    </div>
  );

};