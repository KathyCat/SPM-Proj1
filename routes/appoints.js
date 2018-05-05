var express = require('express');
var router = express.Router();

/* GET users' appoints listing. */
router.get('/', function(req, res, next) {
    res.render('appoint', {
        type: 'appoints'
    });
});

module.exports = router;
