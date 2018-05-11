var express = require('express');
var router = express.Router();
var users = require('./users');

/* GET users' appoints listing. */
router.get('/', function (req, res) {

    var connection = users.startMysql();
    connection.query("SELECT * FROM appoints WHERE email = ?", users.getEmail(), function (err, result) {
        if (err) {
            console.log("Select dog error: " + err);
        } else {
            var jsonresult = JSON.parse(JSON.stringify(result));

            res.render('appointList', {
                type: 'appoints',
                info: jsonresult
            });
            connection.end();
        }
    })

});


router.get('/options', function (req, res) {

    var connection = users.startMysql();
    var dogs;
    connection.query("SELECT * FROM dogs WHERE email = ?", users.getEmail(), function (err, result) {
        if (err) {
            console.log("Select dog error: " + err);
        } else {
            dogs = JSON.parse(JSON.stringify(result));

            console.log(dogs);
            res.render('appoint', {
                type: 'appoints',
                dogs: dogs
            });
            connection.end();
        }
    })
})

/* Add appoints */

router.post('/add', function (req, res) {
    var connection = users.startMysql();
    console.log(req.body);
    var appoint = {
        email: users.getEmail(),
        dog: req.body.dog,
        adate: req.body.date,
        timeslot: req.body.timeslot,
        aoption: req.body.option,
        acomment: req.body.comment
    }
    console.log(appoint);
    connection.query('INSERT INTO appoints SET ?', appoint, function (err, result) {
        if (err) {
            console.log(err.toString());
        } else {
            console.log('Add appoint success');
            connection.query("SELECT * FROM appoints WHERE email = ?", users.getEmail(), function (err, result) {
                if (err) {
                    console.log("Select dog error: " + err);
                } else {
                    var jsonresult = JSON.parse(JSON.stringify(result));

                    res.render('appointList', {
                        type: 'appoints',
                        info: jsonresult
                    });
                    connection.end();
                }
            })
        }
    })

});


module.exports = router;
