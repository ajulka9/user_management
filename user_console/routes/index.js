var express = require('express');
var router = express.Router();
var http = require('http');
try {
    var sha256 = require('js-sha256').sha256;
} catch (err) {
    console.log('Unable to find the sha256 package.');
}

var mock_data = require('../mock/mock_data.json');


function authenticateUserRemote(req,  res, success, failure) {
    console.log("authenticate User Remote!!");

    login = {
        'username': req.body.username,
        'password': req.body.password,
        'factorType': 'primary'
    };

    var options = {
        host: 'localhost',
        port: '8080',
        path: '/myapp/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var post_req = http.request(options, function (res1) {
        res1.setEncoding('utf8');
        res1.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            success(req, res, chunk)
        });
        res1.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            failure(req, res, e);
        });
    });

    // post the data
    post_req.write(JSON.stringify(login));
    return post_req.end();
}


function authenticateUser(req) {
    user = req.body.username;
    password = req.body.password
    console.log("Entered user : " + user);
    hash = sha256(password);

    if (mock_data.creds[user] === undefined) {
        console.log("Unable to find this user. Please register first.");
        req.flash('error', 'Unable to find user in local store!');
        return false;
    }
    else {
        retHash = mock_data.creds[user];
        if (retHash.toLowerCase() === hash.toLowerCase()) {
            return true;
        }
        else {
            req.flash('error', 'Wrong password for the user.');
            return false;
        }
    }
}

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


/* GET home page. */
router.get('/hello', function (req, res, next) {
    res.render('hello', {title: 'AJULKA'});
});


/* GET home page. */
router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Login', flash: req.flash()});
});


var loginSuccess = function (req, res, data) {
    console.log("Login success!!");
    console.log(data)
    req.session.authenticated = true;
    if(mock_data.duo_enabled){
        // Redirect to the DUO page.
        res.redirect('/secure/2fa?user='+req.body.username);
    }
    else {
        res.redirect('/secure');
    }
};

var loginFailure = function(req, res, data) {
    console.log("Login failed!!");
    console.log(data)
    // redirect back to the login page.
        res.redirect('/login');
};


router.post('/userLogin', function (req, res, next) {

    authenticateUserRemote(req, res, loginSuccess, loginFailure);
    // if(authenticateUser(req)){
    //     req.session.authenticated = true;
    //     if(mock_data.duo_enabled){
    //         // Redirect to the DUO page.
    //         res.redirect('/secure/2fa?user='+req.body.username);
    //     }
    //     else {
    //         res.redirect('/secure');
    //     }
    // }
    // else{
    //     // redirect back to the login page.
    //     res.redirect('/login');
    // }
});

module.exports = router;
