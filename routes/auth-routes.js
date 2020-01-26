const router = require('express').Router();
router.get('/login', (req, res) => {
    res.render('login', { user: req.user });
});

router.get('/logout', (req, res) => {
    res.send('logging out!');

});
router.get('/google', (req, res) => {
    res.send('logging in with Google');
});

module.exports = router;