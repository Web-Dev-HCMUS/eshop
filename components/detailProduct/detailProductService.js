const Comment = require("../../models/Comment");
const Product = require("../../models/Product");
const mongooseObject = require("../../ulti/mongoose");

const perPage = 6;


class detailProductService{
    async show(slug, currentPage){
        const totalDoc = await Comment.find({productId: slug}).count();
        const totalPage = Math.ceil(totalDoc / perPage);
        const comment = await Comment.find({productId: slug})
        .lean()
        .skip(perPage * (currentPage - 1))
        .limit(perPage);

        const product = await Product.findOne({ slug: slug }).lean();
        const products2 = await Product.find({ type: product.type }).lean();
        // const comment = await Comment.find({productId: slug}).lean();
        console.log(totalPage)
        return {product, products2, comment, totalPage};
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