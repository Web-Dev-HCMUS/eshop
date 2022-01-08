const productService = require("./productsService");
const mongooseObject = require("../../ulti/mongoose");

const perPage = 9;

class productsController {
  // [GET] /
  async index(req, res, next) {
    const totalDoc = await productService.countDoc();
    const totalPage = Math.ceil(totalDoc / perPage);
    const products = await productService.list(req.query.page || 1);

    res.render("../components/products/views/products", {
      products: mongooseObject.multipleMongooseToObject(products),
      totalPage: totalPage
    });
  }

  // [GET] /:type
  async show(req, res, next) {
    const {filter, sort} = productService.handleSearchParams(req);

    const totalDoc = await productService.countDocBySearch(filter);
    const totalPage = Math.ceil(totalDoc / perPage);
    const currentPage = req.query.page || 1;

    const products = await productService.listBySearch(filter, sort, currentPage);

    res.render("../components/products/views/products", {
      products: mongooseObject.multipleMongooseToObject(products),
      totalPage: totalPage
    });
  }

  async category(req, res, next) {
    const category = req.params.category;

    const totalDoc = await productService.countDocByCategory(category);
    const totalPage = Math.ceil(totalDoc / perPage);
    const currentPage = req.query.page || 1;

    const products = await productService.listByCategory(category, currentPage);

    res.render("../components/products/views/products", {
      products: mongooseObject.multipleMongooseToObject(products),
      totalPage: totalPage
    });
  }
}

module.exports = new productsController();
