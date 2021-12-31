const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cart = new Schema({
  userId: { type:String },
  products: [
    {
      quantity: { type: Number },
      totalPrice: { type:Number }
    },
  ],
  orderTotal : {type: Number},
  checkoutInformation:{
    creditCardNumber: { type: String },
    expire: { type: String },
    ccv: {type: String}
  },
  deliveryInformation:{
    firstName: { type: String },
    lastName: { type: String },
    street: { type: String },
    district: { type: String },
    city: { type: String },
    zip: { type: String },
  },
  status : {type:String}
});

module.exports = mongoose.model("Cart", Cart);
