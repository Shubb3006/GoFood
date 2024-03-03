const express = require("express");
const app = express();
var cors=require("cors");
const port = 5000;
const mongo = require("./db.js");
app.use(cors());
mongo();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/auth", require("./Routes/auth.js"));
app.use("/api/food", require("./Routes/displaydata.js"));
app.use("/api/order", require("./Routes/orderdata.js"));

app.listen(port, () => {
  console.log("Server is listening at port no.5000");
});
