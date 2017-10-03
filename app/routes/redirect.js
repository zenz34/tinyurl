var path = require('path');
var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');
var statsService = require('../services/statsService');

router.get('*', function(req, res) {
    var shortUrl = req.originalUrl.slice(1);


    console.log("redirect.js before getLongUrl " + shortUrl + "  length " + shortUrl.length);
    var longUrl = urlService.getLongUrl(shortUrl, function (url) {

        console.log("redirect.js after getLongUrl " + shortUrl);
        console.log("redirect.js after url " + url);

        if (url) {
            console.log("redirect.js router.get * " + url);
            console.log("redirect.js long Url = " + url["longUrl"]);
            res.redirect(url.longUrl);
            statsService.logRequest(shortUrl, req);
        } else {
            res.sendFile('404.html', {root: path.join(__dirname + '/../public/views')});
        }
    });
});

module.exports = router;


