const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/user');
require('./models/Survey');
require('./services/passport');
const options = {
    useNewUrlParser: true,
};
mongoose.connect(keys.mongoURI, options, (err) => {
    console.log('error occured', err);
});

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://sodnarts.com');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());
app.use(
    cookieSession({
        //Age: days hours min sec milisec
        maxAge: 30 * 24 * 60 * 60 * 1000,
        domain: 'sodnarts-api',
        sameSite: 'none',
        secure: true,
        keys: [keys.cookieKey],
    }),
);

app.use(passport.initialize());
app.use(passport.session());
require('./routes/settingsRoutes')(app);
require('./routes/accountRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
require('./routes/webShopRoutes')(app);
require('./routes/leagueRoutes')(app);

if (1 == 0) {
    // Express will serve up production assets like our main.js file, or main.css file!
    app.use(express.static('../client/build'));

    // Express will serve up the index.html file, if it doesn't recognize the route.
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
}
const PORT = process.env.PORT || 5000;
app.listen(PORT);

exports.app;
