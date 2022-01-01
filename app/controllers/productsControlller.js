const Product = require("../../models/Product");
const mongooseObject = require("../../ulti/mongoose");

// change limit product will show on products page
const perPage = 9;

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
      const category = req.query.category;
      if (category !== "default" && category !== "0") {
        filter.type = category;
      }
      const rangePrice = req.query.rangePrice;

      if (rangePrice !== "0") {
        switch (rangePrice) {
          case "1":
            filter.price = {
              $lte: 10000000,
            };
            break;
          case "2":
            filter.price = {
              $gte: 10000000,
              $lte: 25000000,
            };
            break;
          case "3":
            filter.price = {
              $gte: 25000000,
            };
            break;
          default:
            filter.price = {
              $gte: 1,
            };
            break;
        }
      }

      const release = req.query.release;
      const sortParams = req.query.sort;
      const orderParams = req.query.order;
      let sort = {};
      if (release === "0") {
        sort = { updatedAt: "-1" };
      } else {
        sort = { updatedAt: release };
      }

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
        user: req.user,
      });
    }
  }
}

module.exports = new productsControlller();
