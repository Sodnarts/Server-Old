const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
    app.post('/api/theme', requireLogin, async (req, res) => {
        const { theme } = req.body;
        req.user.theme = theme;
        const user = await req.user.save();
        res.send(user);
    });

    app.post('/api/language', requireLogin, async (req, res) => {
        const { language } = req.body;
        req.user.language = language;
        const user = await req.user.save();
        res.send(user);
    });
};
