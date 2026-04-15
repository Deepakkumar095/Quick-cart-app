# 🛒 Quick Cart (React E-commerce App)

Quick Cart is a modern e-commerce shopping cart application built using React and Redux.  
It allows users to browse products, filter them, and manage cart items efficiently.

---

## 🚀 Features

- 🛍️ Browse products
- 🔍 Search and filter products
- 💰 Price filter (range slider)
- 🧾 Product details page
- 🛒 Add to cart / Remove from cart
- 🔢 Update product quantity (+ / - / manual input)
- 🔐 Login / Logout (Frontend only)
- 💾 Cart state management using Redux
- ⚡ Optimized API calls with caching

---

## 🔐 Authentication

This project includes a basic frontend authentication system.

- Users can login and logout
- Authentication state is managed using localStorage
- Protected routes are implemented

---

## 🛠️ Tech Stack

- ⚛️ React
- 🧠 Redux (State Management)
- 🌐 Axios (API calls)
- 🎨 CSS (Custom UI)
- 🔗 DummyJSON API

---

src/
│
├── components/        # Reusable UI components (Navbar, Footer, etc.)
│
├── pages/             # All main pages
│   ├── Auth/          # Login & Signup pages
│   ├── Shop/          # Shop listing page
│   ├── cart/          # Cart page
│   ├── checkout/      # Checkout page
│   └── ProductDetails/# Single product detail page
│
├── redux/             # Redux store & slices
│
├── services/          # API calls (Axios / Fetch)
│
├── App.jsx            # Main app component (Routing setup)
└── index.jsx          # Entry point


---

# ⚙️ Installation & Setup

## 1️⃣ Clone the repository

- git clone https://github.com/YOUR_USERNAME/quick-cart-react.git
- cd quick-cart-react/Frontend
- npm install
- npm start
