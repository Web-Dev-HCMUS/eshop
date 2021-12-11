const Product = require('../models/Product');

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
      user: req.user,
    });
  }

  // [GET] /:type
  async show(req, res, next) {
    if (req.params.type === "search") {
      console.log("params", req.params.type);
      let filter = {};
      const keyword = req.query.name;
      if (keyword !== "") {
        filter = {
          name: {
            $regex: keyword,
            $options: "i",
          },
        };
      }
      const sortParams = req.query.sort;
      const orderParams = req.query.order;
      let sort = { updatedAt: "-1" };
      if (sortParams === "price") {
        if (orderParams === "asc") {
          sort = { price: "1" };
        } else {
          sort = { price: "-1" };
        }
      }

      const totalDoc = await Product.find(filter).count();
      const totalPage = Math.ceil(totalDoc / perPage);
      const currentPage = req.query.page || 1;

      const products = await Product.find(filter)
        .sort(sort)
        .collation({ locale: "en_US", numericOrdering: true })
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
        user: req.user
      });
    }
  }
}

module.exports = new productsControlller();
