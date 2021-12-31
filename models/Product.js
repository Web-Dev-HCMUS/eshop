const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");

const Schema = mongoose.Schema;

const Product = new Schema(
  {
    _id: { type: Schema.Types.ObjectId },
    name: { type: String, required: true },
    price: { type: Number },
    description: { type: String },
    stock: { type: Number },
    slug: { type: String, slug: "name", unique: true },
    image: { type: Array },
    type: { type: String },
  },
  { timestamps: true }
);

// Add plugin
mongoose.plugin(slug);

//collection name, with SINGULAR NOUN and name on the database will be the PLURAL NOUN
module.exports = mongoose.model("Product", Product);
