const cartModel = require("../../models/Cart");
const productModel = require("../../models/Product");

exports.getPurchase = async (req, status) => {
    const result = await cartModel.find({username: req.user.username});

    let carts = [];
    for(let i=0; i<result.length; i++){

        if(result[i].status === status){
            let totalOrder = 0;
            let cart = [];
            for(let j=0; j<result[i].products.length; j++){
                const product = await productModel.findById({_id:result[i].products[j]._id}).lean();
                cart.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    quantity: result[i].products[j].quantity,
                    totalPrice: result[i].products[j].totalPrice,
                    image: product.image[0],
                    slug: product.slug
                });

                totalOrder += result[i].products[j].totalPrice;
            }
            carts.push({
                _id: result[i]._id,
                products: cart,
                totalOrder: totalOrder
            });
        }
    }

    return carts;
};

exports.cancelOrder = async (req) => {
    const cart = await cartModel.findById(req.params._id);

    for (let j = 0; j < cart.products.length; j++) {
        await productModel.findById(cart.products[j]._id).then(async product => {
            const updateObject = {
                stock: product.stock + cart.products[j].quantity,
                sold: product.sold - cart.products[j].quantity
            }
            await productModel.updateOne({_id: cart.products[j]._id}, updateObject);
        })
    }

    await cartModel.deleteOne({_id: req.params._id});
}

