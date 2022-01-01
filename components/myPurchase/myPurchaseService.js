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
                products: cart,
                totalOrder: totalOrder
            });
        }
    }

    return carts;
};

