const requireLogin = require('../middlewares/requireLogin');
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);

module.exports = (app) => {
    app.post('/api/web-shop', requireLogin, async (req, res) => {
        if (req.body.price < 1) {
            return res.status(400).send({
                error: 'Bad Reqeust - Please add items to your cart before attempting to process payments',
            });
        }

        const charge = await stripe.charges.create({
            amount: req.body.price,
            currency: 'usd',
            description: '$5 for 15 credits',
            source: req.body.token.id,
        });

        res.send('success');
    });
};
