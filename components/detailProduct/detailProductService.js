const Comment = require("../../models/Comment");
const Product = require("../../models/Product");
const mongooseObject = require("../../ulti/mongoose");

class detailProductService{
    async show(slug){
        const product = await Product.findOne({ slug: slug }).lean();
        const products2 = await Product.find({ type: product.type }).lean();
        const comment = await Comment.find({productId: slug}).lean();

        return {product, products2, comment};
    }


    postComment(uName, product, content){
        if(content.length < 2) return;
        
        return new Comment({
            username: uName,
            productId: product,
            content: content,
            createdAt: new Date(),
        }).save();
    }
}
module.exports = new detailProductService;