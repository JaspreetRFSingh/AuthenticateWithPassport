const express = require('express');
const authRoutes = require('./routes/auth-routes');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
const app = express();

// set view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: [keys.session.cookieKey]
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb');
});

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('app now listening for requests on port 3000');
});