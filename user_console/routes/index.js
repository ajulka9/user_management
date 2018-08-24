var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


/* GET home page. */
router.get('/hello', function(req, res, next) {
	res.render('hello', { title: 'AJULKA' });
});


/* GET home page. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login', flash:req.flash() });

});
router.post('/userLogin', function (req, res, next) {
    // you might like to do a database look-up or something more scalable here
    if (req.body.username && req.body.username === 'user' && req.body.password && req.body.password === 'pass') {
        req.session.authenticated = true;
        res.redirect('/secure');
    } else {
        req.flash('error', 'Username and password are incorrect');
        res.redirect('/login');
    }
});

module.exports = router;
