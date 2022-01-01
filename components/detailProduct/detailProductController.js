const detailService = require("./detailProductService");

class detailController {
    async show(req, res, next){
      const currentPage = req.query.page || 1;
      const product = await detailService.show(req.params.slug, currentPage)
      res.render("../components/detailProduct/views/detail-product", product);
    }

  async postComment(req, res, next){
    // if(!req.user) {return res.redirect("/auth/login");}

    const comment = await detailService.postComment(req.user.username, req.params.slug, req.body.contentC);
    res.redirect(`/detail-product/${req.params.slug}`, )
  }
}

module.exports = new detailController();
