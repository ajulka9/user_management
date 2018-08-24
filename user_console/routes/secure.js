var express = require('express');
var http = require('http');
var router = express.Router();
var mock = require('../mock/mock_data.js')



router.get('/', function (req, res, next) {
    res.render('secure', {title:'Secure Content', user:'TestUser'});
});
/* GET addUser Page. */
router.get('/addUser', function(req, res, next) {
    res.render('addUser', { title: 'Add User' });
});

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

/* GET users listing. */
router.get('/deleteUser', function(req, res, next) {
    res.render('deleteUser', { title: 'Delete User' });
});


module.exports = router;
