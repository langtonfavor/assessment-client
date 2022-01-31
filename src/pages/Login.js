import React, { useState } from "react";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(e) {
    e.preventDefault();

    const response = await fetch("http://localhost:2000/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = response.json();
    if (data.user) {
      alert("loggin success");
      window.location.href = "/dashboard";
    } else {
      alert("login failed");
    }

    console.log(data);
  }

  return (
    <div className="form-inputs">
      <h1>Signup</h1>
      <form onSubmit={loginUser}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="enter email"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <br />
        <button type="submit" size="20">
          login
        </button>
      </form>
    </div>
  );
}

export default Login;
