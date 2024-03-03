const express = require("express");
const route = express.Router();
const Order = require("../models/order");

// route.post("/orderdata", async (req, res) => {
//   let data = req.body.order_data;
//   await data.splice(0, 0, { Order_date: req.body.order_date });
//   let eid = await Order.findOne({ email: req.body.email });
//   console.log(eid);
//   if (!eid) {
//     try {
//       await Order.create({
//         email: req.body.email,
//         order_data: [data]
//       }).then(() => {
//         res.json({ Success: True });
//       });
//     } catch (error) {
//       console.log(error.mesage);
//       return res.status(400).json({ Error: "Internal error" });
//     }
//   } else {
//     try {
//       await Order.findOneAndUpdate(
//         { email: req.body.email },
//         { $push: { order_data: data } }
//       ).then(() => {
//         res.json({ success: true });
//       });
//     } catch (error) {
//       console.log(error.mesage);
//       return res.status(400).json({ Error: "Internal error" });
//     }
//   }
// });

route.post("/orderdata", async (req, res) => {
  let data = req.body.order_data;
  try {
    await Order.create({
      email: req.body.email,
      order_data: [data],
    }).then(() => {
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.log(error.mesage);
    return res.status(400).json({ Error: "Internal error" });
  }
});

route.post("/myorder", async (req, res) => {
  try {
    let mydata = await Order.find({ email: req.body.email });
    res.json(mydata);
  } catch (error) {
    console.log(error.mesage);
    return res.status(400).json({ Error: "Internal error" });
  }
});

module.exports = route;
