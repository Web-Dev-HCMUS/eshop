class contactController{
    // [GET] /
    index(req, res, next){
        res.render('../components/contact/views/contact',{user: req.user});
    }
}

module.exports = new contactController();