import React, { useState, useRef } from "react";
import "./Login.css";
import { Cancel, Room } from "@material-ui/icons";
import axios from "axios";

function Login({ setShowLogin, myStorage, setCurrentUser }) {
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrentUser(res.data.username);
      setError(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        LamaPin
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="text"
          placeholder="username"
          ref={nameRef}
        />

        <input
          type="password"
          className="text"
          placeholder="password"
          ref={passwordRef}
        />
        <button className="loginBtn">Login</button>

        {error && <span className="failure">Something went wrong</span>}
      </form>
      <Cancel
        className="loginCancel"
        onClick={() => setShowLogin(false)}
      ></Cancel>
    </div>
  );
}

export default Login;
