var express = require('express');
var router = express.Router();

/* user profile */
router.get('/', function (req, res) {
    var connection = startMysql();
    var sql = "SELECT * FROM user where email = 'user1'";
    connection.query(sql,
        function (error, results) {
            if (error) {
                console.log(error.toString());
            }
            else {
                // substitute with session
                res.render('userProfile', {
                    email: 'user1@gmail.com',
                    type: 'userProfile'
                     });
            }

        }
    );
})


router.post('/updateProfile', function (req, res) {
    console.log(req.body.address);
})

/* login */
router.post('/login', function(req, res) {
    storeUser(req)
    res.render('appoint', {type: 'dogs'});
});

/* register */
router.post('/register', function(req, res) {
    storeUser(req)
    res.render('appoint', {type: 'appoints'});
});



function storeUser(req){
    var email = req.body.email;
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
            console.log('success');
        }
    })
    connection.end();
}


function startMysql(){
    var mysql      = require('mysql');
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
