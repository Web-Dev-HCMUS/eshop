const profileService = require('./profileService');

class aboutUserProfile{
    // [GET] /
    async show(req, res, next){
        const updateSuccess = req.query['update-success'] !== undefined;

        const profile = await profileService.findById(req.user._id);

        res.render('userProfile',{
            profile:profile,
            updateSuccess
        });
    }

    async update(req, res, next) {
        await profileService.updateOneFromDatabase(req)
            .then(() => {
                res.redirect(`/user-profile/?update-success`)
            })
            .catch(next);
    }
}

module.exports = new aboutUserProfile();