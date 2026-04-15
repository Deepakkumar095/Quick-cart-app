import "./App.css";
import axios from "axios";
import { useEffect } from "react";
import { Login } from "./pages/auth/login";
import { Signup } from "./pages/auth/signup";
import { ProductDetails } from "./pages/ProductDetails/productDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { Navbar } from "./components/navbar";
import { Shop } from "./pages/shop/shop";
import { Contact } from "./pages/contact/contact";
import { Cart } from "./pages/cart/cart";
import { Checkout } from "./pages/checkout/checkout";
import { store } from "./redux/store";
import { Footer } from "./components/footer";

function App() {

  useEffect(() => {
    const getProducts = async () => {

      const storedProducts = localStorage.getItem("products");

      if (!storedProducts) {
        try {
          const res = await axios.get("https://dummyjson.com/products?limit=200");
          localStorage.setItem("products", JSON.stringify(res.data));
        }
        catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };
    getProducts();

  }, []);

  const isAuth = localStorage.getItem("isAuth") === "true";

  return (
    <div className="App">
      <Provider store={store}>

        <Router>

          <Navbar />

          <div className="main-content">

            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected Home */}
              <Route
                path="/"
                element={isAuth ? <Shop /> : <Login />}
              />

              {/* Protected Routes */}
              <Route
                path="/cart"
                element={isAuth ? <Cart /> : <Login />}
              />
              <Route
                path="/checkout"
                element={isAuth ? <Checkout /> : <Login />}
              />
              <Route
                path="/product/:id"
                element={isAuth ? <ProductDetails /> : <Login />}
              />

              {/* Public */}
              <Route path="/contact" element={<Contact />} />

            </Routes>

          </div>

          <Footer />

        </Router>

      </Provider>
      
    </div>
  );
}

export default App;