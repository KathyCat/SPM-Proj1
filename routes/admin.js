var express = require('express');
var router = express.Router();
var users = require('./users');

/* GET avaiable time slot */
router.get('/timeslot', function (req, res) {

    var connection = users.startMysql();
    var adate = req.query.date.toString();
    console.log(adate);
    connection.query("SELECT * FROM appoints WHERE adate = ?", adate, function (err, result) {
        if (err) {
            console.log("Select time slot error: " + err);
        } else {
            var data = [];
            if (result != null) {
                var jsonresult = JSON.parse(JSON.stringify(result));
                for (i = 0; i < jsonresult.length; i++) {
                    data.push(jsonresult[i].timeslot);
                }
            }
            res.send(data);
            console.log("Unavailable time: " + data);
            connection.end();
        }
    })

});

/* GET bookings */
router.get('/', function (req, res) {
    var connection = users.startMysql();
    connection.query("SELECT * FROM appoints", function (err, result) {
        if (err) {
            console.log("Select dog error: " + err);
        } else {
            var jsonresult = JSON.parse(JSON.stringify(result));

            res.render('admin', {
                info: jsonresult
            });
            connection.end();
        }
    })

});

/* GET bookings */
router.get('/getUser', function (req, res) {
    var connection = users.startMysql();
    var email = req.query.email;
    var sql = "SELECT * FROM user WHERE email = " + email;
    var address = null;
    var info;
    var contacts = [];

    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            console.log("Select user error: " + err.toString());

        } else {
            console.log('Fetch user success');

            var jsonresult = JSON.parse(JSON.stringify(result));
            address = jsonresult[0].address;

            // select contacts
            sql = "SELECT * FROM usercontact WHERE email = " + email;
            console.log(sql);
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log("Select contact error: " + err.toString());

                } else {

                    var jsonresult = JSON.parse(JSON.stringify(result));
                    console.log(jsonresult);
                    for (i = 0; i < jsonresult.length; i++) {
                        contacts.push(jsonresult[i].contact);
                    }
                }
                info = {
                    "email": email,
                    "address": address,
                    "contacts": contacts
                }


                res.render('userAdmin', {
                    info: info,
                    type: 'userProfile',
                });
                connection.end();
            })
        }
    })

});

module.exports = router;