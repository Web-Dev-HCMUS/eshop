const Product = require("../models/Product");
const mongooseObject = require("../../ulti/mongoose");

const perPage = 6;
let numPage = 0;
class productsControlller {
  // [Get] //query?index=&type=
  query(req, res, next) {
    let type = req.query.type == "" ? {} : { type: req.query.type };
    Product.find(type).count((err, count) => {
      numPage = count;
      numPage = numPage / perPage;
    });

    Product.find(type)
      .limit(perPage)
      .skip(perPage * req.query.index)
      .then((products) => {
        res.render("products", {
          products: mongooseObject.multipleMongooseToObject(products),
          query: {
            index: req.query.index,
            type: type == {} ? "" : req.query.type,
            page: numPage,
          },
        });
      })
      .catch((error) => console.log("error", error));
  }

  // [GET] /:type
  // show(req, res, next) {
  //   Product.find({ type: req.params.type })
  //     .then((products) => {
  //       res.render("products", {
  //         products: mongooseObject.multipleMongooseToObject(products),
  //       });
  //     })
  //     .catch((error) => next(error));
  // }
}

module.exports = new productsControlller();
