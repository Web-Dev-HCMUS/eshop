const Comment = require("../../models/Comment");
const Product = require("../../models/Product");
const mongooseObject = require("../../ulti/mongoose");
const detailService = require("./detailProductService");

class detailControlller {
  // [GET] /:slug
//   show(req, res, next) {
//     Product.findOne({ slug: req.params.slug })
//       .then((product) => {
//         // console.log(mongooseObject.mongooseToObject(product).type);
//         Product.find({ type: mongooseObject.mongooseToObject(product).type })
//           .then((products2) => {
//             Comment.find({productId: req.params.slug})
//             .then((comment) => {
//                 res.render("detail-product", {
//                     product: mongooseObject.mongooseToObject(product),
//                     products2: mongooseObject.multipleMongooseToObject(products2),
//                     user: req.user,
//                     comment: mongooseObject.multipleMongooseToObject(comment),
//                 });
//             })
//             .catch((error) => next(error));
//           })
//           .catch((error) => next(error));
//       })
//       .catch((error) => next(error));
//   }

    async show(req, res, next){
        const product = await detailService.show(req.params.slug )
        res.render("detail-product", product);
    }

  async postComment(req, res, next){
    if(!req.user)
         return res.redirect("/auth/login");

    const comment = await detailService.postComment(req.user.email, req.params.slug, req.body.contentC);
    res.redirect(`/detail-product/${req.params.slug}`, )
  }
}

module.exports = new detailControlller();
