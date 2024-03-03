import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./screen/Home";
import About from "./screen/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import"../node_modules/bootstrap-dark-5/dist/css/bootstap-dark.min.css"
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./screen/Login.js";
import Register from "./screen/Register.js";
import ContextReducer from "./components/ContextReducer.js";
import Cart from "./screen/Cart.js";
import MyOrders from "./screen/MyOrders.js";

function App() {
  return (
    <ContextReducer>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/myorders" element={<MyOrders />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ContextReducer>
  );
}

export default App;
