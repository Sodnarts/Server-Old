const requireLogin = require('../middlewares/requireLogin');
const requireAdmin = require('../middlewares/requireAdmin');
const mongoose = require('mongoose');

const User = mongoose.model('user');

module.exports = (app) => {
    app.get('/api/update-roles', requireLogin, requireAdmin, async (req, res) => {
        const users = await User.find().select({
            googleID: false,
            address: false,
            credits: false,
            theme: false,
            language: false,
            lastName: false,
            email: false,
            phoneNo: false,
            city: false,
        });
        res.send(users);
    });

    app.post('/api/update-roles', requireLogin, requireAdmin, async (req, res) => {
        const user = await User.find({ _id: req.body._id });
        user[0].roles = req.body.roles;
        await user[0].save();

        const users = await User.find().select({
            googleID: false,
            address: false,
            credits: false,
            theme: false,
            language: false,
            lastName: false,
            email: false,
            phoneNo: false,
            city: false,
        });
        res.send(users);
    });
};
