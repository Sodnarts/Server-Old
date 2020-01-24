const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.post('/api/account', requireLogin, async (req, res) => {
        const { address, firstName, lastName, city, phoneNo, email } = req.body;
        if (address || address === '') req.user.address = address;
        if (firstName || firstName === '') req.user.firstName = firstName;
        if (lastName || lastName === '') req.user.lastName = lastName;
        if (city || city === '') req.user.city = city;
        if (phoneNo || phoneNo === '') req.user.phoneNo = phoneNo;
        if (email || email === '') req.user.email = email;

        const user = await req.user.save();
        res.send(user);
    });
};
