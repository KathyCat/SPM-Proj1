var express = require('express');
var router = express.Router();
var users = require('./users');

/* GET dogs listing. */
router.get('/', function(req, res, next) {
    var connection = users.startMysql();
    connection.query("SELECT * FROM dogs WHERE email = ?", users.getEmail(), function (err, result) {
        if (err) {
            console.log("Select dog error: " + err);
        } else {
            var jsonresult = JSON.parse(JSON.stringify(result));
            res.render('dogProfile', {
                type: 'dogs',
                info: jsonresult
            });
            connection.end();
        }
    })
});


/* Add dog */
router.post('/add', function (req, res) {
    var connection = users.startMysql();
    var dog = {
        email: users.getEmail(),
        name: req.body.name,
        breed: req.body.breed,
        birthday: req.body.birthday
    }
    connection.query('INSERT INTO dogs SET ?', dog, function (err, result) {
        if (err) {
            console.log("Insert dog error: " + err);
        }
        else {
            connection.query("SELECT * FROM dogs WHERE email = ?", users.getEmail(), function (err, result) {
                if (err) {
                    console.log("Select dog error: " + err);
                } else {
                    var jsonresult = JSON.parse(JSON.stringify(result));
                    res.render('dogProfile', {
                        type: 'dogs',
                        info: jsonresult
                    });
                    connection.end();
                }
            })
        }
    })
})



module.exports = router;
