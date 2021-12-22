const profileService = require('./profileService');


class aboutUserProfile{
    // [GET] /
    async show(req, res, next){
        const updateSuccess = req.query['update-success'] !== undefined;
        const updateFail = req.query['update-fail'] !== undefined;

        const profile = await profileService.findById(req.user._id);

        res.render('userProfile',{
            profile:profile,
            updateSuccess, 
            updateFail
        });
    }

    async update(req, res, next) {

        const success = await profileService.updateOneFromDatabase(req)
            // .then(() => {
            //     res.redirect(`/user-profile/?update-success`)
            // })
            // .catch(next);
        if(success){
            res.redirect(`/user-profile/?update-success`)
        }
        else{
            res.redirect(`/user-profile/?update-fail`)
        }
    }
}

module.exports = new aboutUserProfile();