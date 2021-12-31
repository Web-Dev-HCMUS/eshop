const profileService = require('./profileService');


class userProfileController{
    // [GET] /
    async show(req, res, next){
        const updateSuccess = req.query['update-success'] !== undefined;
        const updateFail = req.query['update-fail'] !== undefined;

        const profile = await profileService.findById(req.user._id);

        res.render('../components/profile/views/userProfile',{
            profile:profile,
            updateSuccess, 
            updateFail
        });
    }

    async update(req, res, next) {
        const success = await profileService.updateOneFromDatabase(req)
        if(success){
            res.redirect(`/user-profile/?update-success`)
        }
        else{
            res.redirect(`/user-profile/?update-fail`)
        }
    }

    async changePasswordPage(req, res, next){
        const updateSuccess = req.query['update-success'] !== undefined;
        const updateFail = req.query['update-fail'] !== undefined;

        const profile = await profileService.findById(req.user._id);

        res.render('../components/profile/views/changePassword',{
            profile:profile,
            updateSuccess,
            updateFail
        });
    }

    async updateNewPassword(req, res, next) {
        const success = await profileService.updatePassword(req)
        if(success){
            res.redirect(`/user-profile/change-password?update-success`)
        }
        else{
            res.redirect(`/user-profile/change-password?update-fail`)
        }
    }
}

module.exports = new userProfileController();