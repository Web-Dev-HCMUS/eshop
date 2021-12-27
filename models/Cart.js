const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
  _id: { type: Schema.Types.ObjectId },
  userId: { type: Schema.Types.ObjectId },
  products: [
    {
      productId: { type: Schema.Types.ObjectId },
      quantity: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Cart", Cart);
