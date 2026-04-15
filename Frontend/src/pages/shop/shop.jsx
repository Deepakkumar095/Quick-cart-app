import React, { useState, useEffect } from "react";
import { Product } from "./product";
import "./shop.css";
import { fetchProducts } from "../../services/api";

export const Shop = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(200);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");

  // API CALL
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);


  // Filter Logic
  const filteredProducts = products.filter((product) => {
    let matchesCategory = true;

    const cat = product.category?.toLowerCase() || "";

    if (category === "mens") {
      matchesCategory =
        cat === "mens-shirts" ||
        cat === "mens-shoes" ||
        cat === "mens-watches";
    }
    else if (category === "womens") {
      matchesCategory =
        cat === "womens-dresses" ||
        cat === "womens-shoes" ||
        cat === "womens-bags" ||
        cat === "womens-jewellery" ||
        cat === "tops";
    }
    else if (category === "electronics") {
      matchesCategory =
        cat === "smartphones" ||
        cat === "laptops" ||
        cat === "tablets" ||
        cat === "mobile-accessories";
    }
    else if (category === "beauty") {
      matchesCategory =
        cat === "beauty" ||
        cat === "fragrances" ||
        cat === "skin-care";
    }
    else if (category === "home") {
      matchesCategory =
        cat === "furniture" ||
        cat === "home-decoration" ||
        cat === "kitchen-accessories";
    }
    else if (category === "accessories") {
      matchesCategory =
        cat === "sunglasses" ||
        cat === "sports-accessories";
    }

    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase());

    const matchesPrice = product.price <= maxPrice;

    return matchesCategory && matchesSearch && matchesPrice;
  });


  return (
    <div className="shop">
      <div className="shopTitle">
        <div className="shopHeader">
          <p className="subTitle">Products</p>
          <h1>Our Products</h1>
          <p className="desc">
            Have a good setup for your minimalist home
          </p>
        </div>


      </div>


      <div className="categories">
        <span onClick={() => setCategory("all")} className={category === "all" ? "active" : ""}>All</span>
        <span onClick={() => setCategory("mens")} className={category === "mens" ? "active" : ""}>Men</span>
        <span onClick={() => setCategory("womens")} className={category === "womens" ? "active" : ""}>Women</span>
        <span onClick={() => setCategory("electronics")} className={category === "electronics" ? "active" : ""}>Electronics</span>
        <span onClick={() => setCategory("beauty")} className={category === "beauty" ? "active" : ""}>Beauty</span>
        <span onClick={() => setCategory("home")} className={category === "home" ? "active" : ""}>Home</span>
        <span onClick={() => setCategory("accessories")} className={category === "accessories" ? "active" : ""}>Accessories</span>
      </div>

      {/*Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="range"
          min="0"
          max="200"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />

        <p>Max Price: ${maxPrice}</p>
      </div>



      {/*Loading State */}
      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <h2>Loading products...</h2>
        </div>
      ) : (
        <div className="products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Product
                key={product.id}
                data={{
                  id: product.id,
                  productName: product.title,
                  price: product.price,
                  productImage: product.thumbnail,
                }}
              />
            ))
          ) : (
            <h2>No products found</h2>
          )}
        </div>
      )}
      
    </div>

  );

};