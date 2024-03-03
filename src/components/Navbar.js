import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import { useCart } from "./ContextReducer";
import Modal from "../Modal";
import Cart from "../screen/Cart";

export default function Navbar() {
  const [userName, setUserName] = useState("");
  const [cartView, setcartview] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.user.name);
      // console.log(decodedToken.user.name)
    }
  }, []);

  const navigate = useNavigate();
  function onLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  }
  const data = useCart();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-success">
        <div className="container-fluid">
          <a className="navbar-brand fs-3" href="#">
            GoFood
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem("token") ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link fs-5"
                      aria-current="page"
                      to="/myorders"
                    >
                      My Orders
                    </Link>
                  </li>
                  <div style={{ margin: "auto" }}>
                    <p style={{ margin: "auto", fontSize:"20px" }}>{`Hey ${userName}`}</p>
                  </div>
                </>
              ) : (
                ""
              )}
            </ul>
            <div className="d-flex">
              {localStorage.getItem("token") ? (
                <>
                  <div
                    className="btn bg-white text-success mx-1"
                    onClick={() => setcartview(true)}
                  >
                    My Cart{" "}
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>
                  {cartView ? (
                    <Modal onClose={() => setcartview(false)}>
                      <Cart />
                    </Modal>
                  ) : null}
                  <div
                    className="btn bg-white text-success mx-1"
                    onClick={onLogout}
                  >
                    Logout
                  </div>
                </>
              ) : (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
