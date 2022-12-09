import axios from "axios";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import "./Login.css";

const Login = () => {
  const alert = useAlert();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);

    try {
      const response = await axios.post(
        "https://contest-backend-1pnqlunz0-ashishkumarjaiswal.vercel.app/admin/login",
        {
          userId,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setLoading(false);

      if (response.data.success) {
        localStorage.setItem("contest", JSON.stringify(response.data.contest));

        window.location.reload();
      } else {
        alert.error(response.data.msg);
      }
    } catch (error) {
      setLoading(false);
      alert.error(error.response.data.msg);
      console.log(error);
    }
  };

  return (
    <>
      <div className="login">
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>

        <form onSubmit={handleOnSubmit} className="loginForm">
          <h3>Login Here</h3>

          <label className="loginLabel">Username</label>
          <input
            className="loginInput"
            type="text"
            placeholder="UserId"
            id="username"
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            value={userId}
          />

          <label className="loginLabel">Password</label>
          <input
            className="loginInput"
            type="password"
            placeholder="Password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <button disabled={loading} type="submit" className="loginButton">
            Log In
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
