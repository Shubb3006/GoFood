const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://GoFood:Shubb3031@cluster0.tedqt6f.mongodb.net/GoFood?retryWrites=true&w=majority";
async function mongoConnect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Food_Order");
    // await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");

    const food_collection = mongoose.connection.db.collection("food_items");
    global.food_item = await food_collection.find({}).toArray();

    const cat_collection = mongoose.connection.db.collection("food_category");
    global.food_category = await cat_collection.find({}).toArray();
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = mongoConnect;
