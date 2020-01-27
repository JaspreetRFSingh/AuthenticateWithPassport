const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    res.send('logging out!');

});

router.get('/success', (req, res) => {
    res.send('SUCCESS Logging in via Google!');
});

router.get('/failure', (req, res) => {
    res.send('FAILURE logging in via google!')
});

router.get('/google/oauth2callback', passport.authenticate('google', { successRedirect: '/auth/success', failureRedirect: '/auth/failure' }) , function (req, res) {res.redirect('/');} );

router.get('/google', passport.authenticate('google', {
    scope: ['profile']}),function (req, res){ });

module.exports = router;