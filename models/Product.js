const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');

const Schema = mongoose.Schema;

const Product = new Schema({
    name: { type : String , required: true },
    price: { type : String },
    description: { type : String },
    stock: { type : String },
    slug: { type: String, slug: 'name', unique: true},
    image: { type : Array },
    type: {type: String},
},{timestamps: true});

// Add plugin
mongoose.plugin(slug);

//collection name, with SINGULAR NOUN and name on the database will be the PLURAL NOUN
module.exports = mongoose.model('Product', Product);