import React, { useState } from "react";
import "../styles/Login.scss"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { setLogin } from "../redux/state";
import toast from 'react-hot-toast'; // Import toast from react-hot-toast

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the server
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // Check if login request was successful
      if (!response.ok) {
        // If login failed, display error toast message
        const errorData = await response.json();
        toast.error(errorData.message);
        return; // Return early if login fails
      }

      // Extract user data if login was successful
      const loggedIn = await response.json();

      // Dispatch login action and redirect to main page
      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        );
        navigate("/");
        // Display success toast message
        toast.success("You are logged in");
      }

    } catch (err) {
      console.log("Login failed", err.message);
    }
  }

  return (
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          {/* Input fields for email and password */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Button to submit login form */}
          <button type="submit">შესვლა</button>
        </form>
        {/* Link to register page */}
        <Link to="/register">არ გაქვთ ანგარიში? რეგისტრაცია</Link>
      </div>
    </div>
  );
};

export default LoginPage;
