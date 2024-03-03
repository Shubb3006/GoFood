import React from "react";
import { useCart, useDispatch } from "../components/ContextReducer";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatch();
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty</div>
      </div>
    );
  }

  async function handlecheckout() {
    let useremail = localStorage.getItem("email");
    console.log(useremail);

    let response = await fetch("http://localhost:5000/api/order/orderdata", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        order_data: data,
        email: useremail,
      }),
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  }
  let totalprice = data.reduce((total, food) => total + food.price, 0);
  return (
    <div>
      <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <th scope="row">{food.name}</th>
                <th scope="row">{food.qty}</th>
                <th scope="row">{food.size}</th>
                <th scope="row">{food.price}</th>
                <th>
                  <i
                    class="fa-solid fa-trash"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                    style={{ cursor: "pointer" }}
                  ></i>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Total Price: {totalprice}</h2>
        <button onClick={handlecheckout} className="btn bg-success mt-5">
          Check out
        </button>
      </div>
    </div>
  );
}
