import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export const Login = () => {
  const [enableInput, setEnableInput] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === user.email &&
      savedUser.password === user.password
    ) {
      localStorage.setItem("isAuth", "true");
      navigate("/");
      window.location.reload();
    }
    else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {/* Left */}
        <div className="auth-left">
          <div>
            <h1>QuickCart</h1>
            <p>
              The platform where you can shop smartly and manage your cart easily.
            </p>
          </div>
          <p>© 2026 QuickCart</p>
        </div>

        {/* Right */}
        <div className="auth-right">
          <h2>Welcome Back</h2>

          <input
            type="email"
            placeholder="Email"
            onFocus={() => setEnableInput(true)}
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onFocus={() => setEnableInput(true)}
            disabled={!enableInput}
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <button onClick={handleLogin}>Login</button>

          <Link to="/signup" className="auth-link">
            Don't have an account? Signup
          </Link>
        </div>

      </div>
    </div>
  );
};