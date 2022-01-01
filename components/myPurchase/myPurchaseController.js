const myPurchaseService = require('./myPurchaseService');
class myPurchaseController{
    // [GET] /
    async show(req, res, next){
        res.render('../components/myPurchase/views/myPurchase');
    }

    async getPurchase(req, res, next){
        const carts = await myPurchaseService.getPurchase(req, req.params.status);
        let isEmpty = false
        if(carts.length === 0){
            isEmpty = true;
        }
        res.render('../components/myPurchase/views/myPurchase', {carts, isEmpty});
    }
}

module.exports = new myPurchaseController();