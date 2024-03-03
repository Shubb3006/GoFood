import React, { useRef, useState, useEffect } from "react";
import { useCart, useDispatch } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatch();
  const priceRef = useRef();
  let data = useCart();
  let option = props.options;
  let priceoption = Object.keys(option);
  const [qty, setqty] = useState(1);
  const [size, setsize] = useState("");

  //   async function addtocart() {
  //     console.log(data);
  //     let existingItem = data.find((item) => item.id === props.id && item.size === size);
  //     // let food = [];
  //     // for (const item of data) {
  //     //   console.log("item id", item.id);
  //     //   console.log("props id", props.id);
  //     //   if (item.id === props.id) {
  //     //     food = item;
  //     //     break;
  //     //   }
  //     // }
  //     // data.map((item)=>{
  //     //   if(item.id==props.id)
  //     //   food.push(item)
  //     // })
  //     console.log("food");
  //     console.log(food);
  //     if (food.length !== 0) {
  //       console.log("food size:", food.size);
  //       console.log(" size:", size);
  //       if (food.size === size) {
  //         console.log("updated");
  //         console.log(finalPrice);
  //         await dispatch({
  //           type: "UPDATE",
  //           id: props.id,
  //           size:size,
  //           price: finalPrice,
  //           qty: qty,
  //         });
  //         return;
  //       } else if (food.size !== size) {
  //         console.log("Addded");

  //         await dispatch({
  //           type: "ADD",
  //           id: props.id,
  //           name: props.name,
  //           price: finalPrice,
  //           qty: qty,
  //           size: size,
  //           img: props.img,
  //         });
  //         return;
  //       }
  //       return;
  //     }
  //     await dispatch({
  //       type: "ADD",
  //       id: props.id,
  //       name: props.name,
  //       price: finalPrice,
  //       qty: qty,
  //       size: size,
  //       img: props.img,
  //     });
  //   }
  // async function addtocart() {
  //   let food = data.find((item) => item.id === props.id && item.size === size);
  //   if (food) {
  //     await dispatch({
  //       type: "UPDATE",
  //       id: props.id,
  //       size: size,
  //       qty: qty,
  //     });
  //   } else {
  //     await dispatch({
  //       type: "ADD",
  //       id: props.id,
  //       name: props.name,
  //       price: finalPrice,
  //       qty: qty,
  //       size: size,
  //       img: props.img,
  //     });
  //   }
  // }

  async function addtocart(e) {
    e.preventDefault();
    // console.log(data);
    let existingItem = data.find(
      (item) => item.id === props.id && item.size === size
    );

    if (existingItem) {
      // console.log("Item already in cart:", existingItem);
      // console.log("Updating item...");
      await dispatch({
        type: "UPDATE",
        id: props.id,
        size: size,
        price: finalPrice,
        qty:qty
      });
    } else {
      // console.log("Item not in cart or size mismatch, adding new item");
      await dispatch({
        type: "ADD",
        id: props.id,
        name: props.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.img,
      });
    }
  }

  let finalPrice = qty * parseInt(option[size]);
  useEffect(() => {
    setsize(priceRef.current.value);
  });
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
        <img
          style={{ objectFit: "fill", maxHeight: "155px" }}
          src={props.img}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100  rounded"
              onChange={(e) => {
                setqty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  rounded"
              ref={priceRef}
              onChange={(e) => {
                setsize(e.target.value);
              }}
            >
              {/* <option value="half">Half</option>
              <option value="full">Full</option> */}
              {priceoption.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline">{finalPrice}/-</div>
          </div>
          <hr />
          <button
            className="btn btn-success justify-center ms-2"
            onClick={addtocart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
