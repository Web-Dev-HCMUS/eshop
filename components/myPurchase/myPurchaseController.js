const myPurchaseService = require('./myPurchaseService');
class myPurchaseController{
    // [GET] /
    async show(req, res, next){
        res.render('../components/myPurchase/views/myPurchase');
    }

    async ordered(req, res, next){
        await myPurchaseService.getOrderedCart(req);
        res.render('../components/myPurchase/views/myPurchase');
    }
}

module.exports = new myPurchaseController();