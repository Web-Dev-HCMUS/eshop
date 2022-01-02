const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  type: { type: String },
});

module.exports = mongoose.model("Category", Category);
