import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./auth.css";

export const Signup = () => {

  const [enableInput, setEnableInput] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!user.email || !user.password) {
      alert("Please fill all fields !");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    alert("Signup successful");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        {/* left side */}
        <div className="auth-left">
          <div>
            <h1>QuickCart</h1>
            <p>
              Join us and experience seamless shopping with smart cart features.
            </p>
          </div>
          <p>© 2026 QuickCart</p>
        </div>

        {/* right side */}
        <div className="auth-right">
          <h2>Create Account</h2>

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
            value={user.password}
            onFocus={() => setEnableInput(true)}
            disabled={!enableInput}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <button onClick={handleSignup}>Signup</button>

          <Link to="/login" className="auth-link">
            Already have an account? Login
          </Link>
        </div>

      </div>
    </div>
  );
};