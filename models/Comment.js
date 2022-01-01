const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    username: {type: String},
    email: { type: String },
    productId: { type: String },
    content: { type: String },
    createdAt: { type: Date },
  },
);

module.exports = mongoose.model("comments", Comment);
