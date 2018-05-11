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

module.exports = router;