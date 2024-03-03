import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const datatobackend = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const json = await res.json();
    if (res.status === 400) {
      window.alert("Please Enter the appropriate data");
    } else if (res.status === 401) {
      window.alert("Invalid details");
    } else {
      window.alert("Login Successfull");
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("email",email);
      console.log(localStorage.getItem("token"));
      navigate("/");
    }
  };
  return (
    <div>
      <form className="m-2" method="POST" onSubmit={datatobackend}>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            name="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Your Email"
            required="true"
            onChange={handlechange}
            value={user.email}
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Your Password"
            required="true"
            onChange={handlechange}
            value={user.password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Login
        </button>
        <Link to="/register">
          <button class="btn btn-primary m-3">New User</button>
        </Link>
      </form>
    </div>
  );
}
