var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var email = null;

/* user profile */
router.get('/', function (req, res) {
    getUser(req, res, false);
})


router.post('/updateProfile', function (req, res) {
    var connection = startMysql();
    var address = req.body.address;
    var contacts = req.body.contact;
    console.log(req.body);
    var sql;

    sql = "UPDATE user SET address = ? WHERE email = ?";
    console.log(sql);
    connection.query(sql, [address, email], function (err, result) {
        if (err) {
            console.log("Update error", +err.toString());
        } else {
            console.log('Update address success');
        }
    })


    if (contacts != null) {
        if (contacts[0]) {
            console.log("Contact:" + contacts.toString());

            sql = "DELETE FROM usercontact WHERE email = '" + email + "'";

            connection.query(sql, function (err, result) {
                if (err) {
                    console.log("Delete contact error: " + err.toString());
                }
                else {
                    sql = "INSERT INTO usercontact (email, contact) VALUES ";
                    for (i = 0; i < contacts.length; i++) {
                        sql += "( '" + email + "' , '" + contacts[i] + "' " + "), ";
                    }
                    sql = sql.replace(/, $/, "");
                    console.log("Update sql is : " + sql);
                    connection.query(sql, function (err, result) {
                        if (err) {
                            console.log("Insert contacts error: " + err.toString());
                        }
                    });
                    res.send({});
                    connection.end();
                }
            });
        }
    } else {
        res.send({});
        connection.end();
    }


})

/* login */
router.post('/login', function(req, res) {
    getUser(req, res, true);
});

/* register */
router.post('/register', function(req, res) {
    email = req.body.email;
    var psw = req.body.psw;
    var connection = startMysql();
    var user = {
        email : email,
        password : psw
    }

    connection.query('INSERT INTO user SET ?', user, function(err, result){
        if(err){
            console.log(err.toString());
        }else{
            console.log('Register success');
        }
        var info = {"email": email};
        res.render('userProfile', {
            info: info,
            type: 'userProfile',

        });
    })
    connection.end();

});


function getUser(req, res, requirePsw) {
    if (requirePsw) {
        email = req.body.email;
    }
    var connection = startMysql();
    var address = null;
    var info;
    var contacts = [];


    var sql = "SELECT * FROM user WHERE email = '" + email + "'";
    if (requirePsw) {
        sql += " and password = '" + req.body.psw + "'"
    }
    console.log(sql);
    connection.query(sql, function (err, result) {
        if (err) {
            email = null;
            console.log("Select user error: " + err.toString());

        } else {
            console.log('Fetch user success');

            var jsonresult = JSON.parse(JSON.stringify(result));
            address = jsonresult[0].address;

            // select contacts
            sql = "SELECT * FROM usercontact WHERE email = ?";
            connection.query(sql, email, function (err, result) {
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


                res.render('userProfile', {
                    info: info,
                    type: 'userProfile',
                });
                connection.end();
            })
        }
    })


}


function startMysql(){
    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'keningw',
        password : '65!TtBgdP%',
        database : 'spm_proj1'
    });

    connection.connect();
    return connection;
}


module.exports = router;
module.exports.getEmail = function () {
    return email;
};
module.exports.startMysql = startMysql;