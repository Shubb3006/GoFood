import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    location: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  async function datatobackend(e) {
    e.preventDefault();
    const { email, name, password, cpassword, location } = user;

    const res = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
        cpassword,
        location,
      }),
    });
    const json = await res.json();

    if (res.status === 400) {
      window.alert("Please Enter the appropriate data");
    } else if (res.status === 401) {
      window.alert("User Already Exists");
    } else if (res.status === 402) {
      window.alert("Passwords do not match");
    } else {
      window.alert("Register Successfull");
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("email", email);
      console.log(localStorage.getItem("token"));
      // onRegister();
      navigate("/");
    }
  }

  return (
    <div>
      <form className="m-2" method="POST" onSubmit={datatobackend}>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            required="true"
            value={user.name}
            onChange={handlechange}
          />
        </div>
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
        <div class="form-group">
          <label for="ConfirmPassword">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            name="cpassword"
            aria-describedby="emailHelp"
            placeholder="Enter Password Again"
            required="true"
            onChange={handlechange}
            value={user.cpassword}
          />
        </div>
        <div class="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            class="form-control"
            name="location"
            placeholder="Enter Your Location"
            required="true"
            onChange={handlechange}
            value={user.location}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Register
        </button>
        <Link to="/login">
          <button class="btn btn-primary m-3">I have an account</button>
        </Link>
      </form>
    </div>
  );
}
