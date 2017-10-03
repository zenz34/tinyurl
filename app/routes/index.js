var path = require('path');
var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname + '/../public/views')});
});

module.exports = router;


