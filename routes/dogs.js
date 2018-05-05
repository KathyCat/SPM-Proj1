var express = require('express');
var router = express.Router();

/* GET dogs listing. */
router.get('/', function(req, res, next) {
    res.render('dogProfile', {
        type: 'dogs'
    });
});

module.exports = router;
