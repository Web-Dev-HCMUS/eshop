const Product = require("../models/Product");
const mongooseObject = require("../../ulti/mongoose");

// change limit product will show on products page
const perPage = 6;

class productsControlller {
  // [GET] /
  async index(req, res, next) {
    const totalDoc = await Product.find({}).count();
    const totalPage = Math.ceil(totalDoc / perPage);
    const currentPage = req.query.page || 1;
    const products = await Product.find({})
      .skip(perPage * (currentPage - 1))
      .limit(perPage);

    res.render("products", {
      products: mongooseObject.multipleMongooseToObject(products),
      totalPage: totalPage,
    });
  }

  // [GET] /:type
  async show(req, res, next) {
    if (req.params.type === "search") {
      const search = req.query.name;
      console.log(search);
      const filter = {
        name: {
          $regex: search,
          $options: "i",
        },
      };
      const totalResult = await Product.find(filter).count();
      const totalPage = Math.ceil(totalResult / perPage);
      const currentPage = req.query.page || 1;
      const products = await Product.find(filter)
        .skip(perPage * (currentPage - 1))
        .limit(perPage);
      res.render("products", {
        products: mongooseObject.multipleMongooseToObject(products),
        totalPage: totalPage,
      });
    } else {
      const totalDoc = await Product.find({ type: req.params.type }).count();
      const totalPage = Math.ceil(totalDoc / perPage);
      const currentPage = req.query.page || 1;
      const products = await Product.find({ type: req.params.type })
        .skip(perPage * (currentPage - 1))
        .limit(perPage);

      res.render("products", {
        products: mongooseObject.multipleMongooseToObject(products),
        totalPage: totalPage,
      });
    }
  }
  async search(req, res, next) {
    console.log(req.query);
    res.send("search");
  }
}

module.exports = new productsControlller();
