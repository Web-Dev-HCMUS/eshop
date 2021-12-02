const Product = require("../models/Product");
const mongooseObject = require("../../ulti/mongoose");

let perPage = 6;
class productsControlller {
  // [GET] /
  // index(req, res, next){
  //     Product.find({})
  //         .then(products => {
  //             res.render('products',{products: mongooseObject.multipleMongooseToObject(products)});
  //         })
  //         .catch(error => next(error));
  // }
  query(req, res, next) {
    console.log("query", req.query);
    let type = req.query.type == "" ? {} : { type: req.query.type };
    Product.find(type)
      .limit(perPage)
      .skip(perPage * req.query.index)
      .then((products) => {
        res.render("products", {
          products: mongooseObject.multipleMongooseToObject(products),
          query: {
            index: req.query.index,
            type: type == {} ? "" : req.query.type,
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
