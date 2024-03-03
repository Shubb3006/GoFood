const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  order_data: {
    type: Array,
    required: true,
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  // date: {
  //   type: String,
  //   default: () => moment().format("YYYY-MM-DD"),
  // },
  date: {
    type: String, // Change the type to String
    default: function () {
      // Use a function to set the default value
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      let month = currentDate.getMonth() + 1;
      let day = currentDate.getDate();

      // Pad month and day with leading zeros if necessary
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;

      return `${day}-${month}-${year}`;
    },
  },
});

module.exports = mongoose.model("ORDER", orderSchema);
