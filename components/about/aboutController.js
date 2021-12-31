
class aboutController{
    // [GET] /
    index(req, res, next){
        res.render('../components/about/views/about',{user: req.user});
    }
}

module.exports = new aboutController();