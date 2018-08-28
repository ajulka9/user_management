var express = require('express');
var http = require('http');
var router = express.Router();
var mock = require('../mock/mock_data.json')
var Duo = require('../public/javascripts/Duo-Web-v2')



router.get('/', function (req, res, next) {
    res.render('secure', {title:'Secure Content', user:'TestUser'});
});
/* GET addUser Page. */
router.get('/addUser', function(req, res, next) {
    res.render('addUser', { title: 'Add User' });
});


function initiateSecondFactor(req,  res, success, failure) {
    console.log("Initiate Second factor for User !!");

    login = {
        'username': req.query.user,
        'factorType': 'secondary',
        'scenario': 'register'
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

function finishSecondFactor(req,  res, success, failure) {
    console.log("Initiate Second factor for User !!");

    login = {
        'signRequest': req.body.from_duo,
        'factorType': 'secondary',
        'scenario': 'verify'
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

function submitPostAction(){
    console.log('Submit post action.');
}



// window.addEventListener('DOMContentLoaded', initDuoFrame({
//     host:'xyz',
//     signRequest: 'abc'
// }), false);



var loginSuccess = function (req, res, data) {
    console.log("Second Factor success!!");
    console.log(data)
    req.session.authenticated = true;
    if(data){
        parsed = JSON.parse(data);
        if(parsed['scenario'] == 'register') {
            signature = parsed['signature'];
            host = parsed['host'];
            console.log(signature);
            console.log(host);
            res.render('2FA', {title: '2FA Login - Duo', host: host, sign: signature});
        }
        else{
            console.log('DUO Status : '+ parsed['mfaResponse']);
            res.render('secure', {title: 'Welcome '+ parsed['mfaResponse'] + ' You have successfully validated your second factor with Duo.'});
        }
    }
    else{
        req.flash('error', 'Error with the LoginHandler');
        // redirect back to the login page.
        res.redirect('/login');
    }
    // res.statusCode = 200;
    // res.write(data);
    // res.end();
    // res.render('2FA', { title: '2FA Login - Duo'});
    // initiateSecondFactor(req, res, loginSuccess, loginFailure);
};

var loginFailure = function(req, res, data) {
    console.log("Second Factor failed!!");
    console.log(data)
    // redirect back to the login page.
    res.redirect('/login');
};

function getAllUsers(mocked, success, failure){
    if(mock){
        console.log("Mock");
        var parsed = JSON.parse(mock);
        console.log(parsed);
        success(JSON.parse(mock).getAllUsers);
        return;
    }
    var options = {
        host: 'localhost',
        port: '8080',
        path: '/myapp/user/all',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Set up the request
    var post_req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            success(chunk)
        });
        res.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            failure(e);
        });
    });
    return post_req.end();
}

function addUserRemote(user, success, failure){
    var options = {
        host: 'localhost',
        port: '8080',
        path: '/myapp/user',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };


    // Set up the request
    var post_req = http.request(options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
            success(chunk)
        });
        res.on('error', function(e) {
            console.log('problem with request: ' + e.message);
            failure(e);
        });
    });

    // post the data
    post_req.write(JSON.stringify(user));
    return post_req.end();
}

router.get('/getAllUsers', function(req, res, next){
    getAllUsers(true, function(chunk){
        res.status(200).send(chunk);
    }, function(error){
        res.status(400).send(error);
    })
});

/* POST users listing. */
router.post('/addUser', function(req, res, next) {
    console.log("POST Add user");
    console.log("email : "+ req.body.email);
    console.log("firstName : "+ req.body.firstName);
    console.log("lastName : "+ req.body.lastName);

    var newUser = {
        'email':req.body.email,
        'lastName': req.body.lastName,
        'firstName': req.body.firstName
    }

    addUserRemote(newUser, function(data){
        console.log("User created");
        res.status(200).send(data);
    }, function(error){
        console.log("User not created");
        res.status(400).send(data);
    });
});

/* POST From IFRAME */
router.post('/2fa', function(req, res, next) {
    console.log("POST hook from the DUO frame");
    console.log(req.body);
    finishSecondFactor(req,res,loginSuccess,loginFailure);
    // var respBody = {from_duo:req.body.from_duo};
    // res.statusCode = 200;
    // res.write(JSON.stringify(respBody))
    // res.end();
});



/* 2fa Page. */
router.get('/2fa', function(req, res, next) {
    console.log("Loading the 2fa page: " + req.query.user);
    // initDuoFrame({
    //     host:'xyz',
    //     signRequest: 'abc'
    // });
    initiateSecondFactor(req,res,loginSuccess,loginFailure)

});

/* GET users listing. */
router.get('/deleteUser', function(req, res, next) {
    res.render('deleteUser', { title: 'Delete User' });
});


module.exports = router;
