import React, { useEffect, useState } from "react";
export default function MyOrders() {
  const [orderData, setOrderData] = useState("");
  async function fetchOrder() {
    // console.log(localStorage.getItem("email"));
    let res = await fetch("http://localhost:5000/api/order/myorder", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    });
    setOrderData(await res.json());
  }
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <div className="container">
      <div className="row">
        {orderData ? (
          orderData.map((data) => {
            let finalPrice = 0;
            return (
              <div className="m-auto mt-5">
                <h1>{data.date}</h1>
                {data.order_data
                  ? data.order_data.map((dataitem) => {
                      return (
                        <div className="col-12 col-md-6 col-lg-3">
                          {dataitem ? (
                            dataitem.map((data1, i) => {
                              finalPrice += data1.price;
                              return (
                                <div className="card mt-3">
                                  <div className="card-body">
                                    <h5 className="card-tile">{data1.name}</h5>
                                    <div className="container w-100 p-0">
                                      <span className="m-1">{data1.qty}</span>
                                      <span className="m-1">{data1.size}</span>
                                      <div className="d-inline ms-2 h-100 w-20 fs-5">
                                        Rs.{data1.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <h1>Not Found</h1>
                          )}
                        </div>
                      );
                    })
                  : "not"}
                <p className="mt-3">Total Price : {finalPrice}</p>
              </div>
            );
          })
        ) : (
          <h1>Not</h1>
        )}
      </div>
    </div>
  );
}
