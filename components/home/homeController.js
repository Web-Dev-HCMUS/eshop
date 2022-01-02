const mongooseObject = require("../../ulti/mongoose");
const homeService = require("./homeService");

exports.list = async function (req, res) {
  const products = await homeService.list();
  const category = await homeService.category();
  req.session.category = mongooseObject.multipleMongooseToObject(category);
  res.render("../components/home/views/home", {
    products: mongooseObject.multipleMongooseToObject(products),
    user: req.user,
  });
};
