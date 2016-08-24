

var express = require('express');
var router = express.Router();
var urlService = require('../services/urlService');


router.get('*', function(req, res) {
    var shortUrl = req.originalUrl.slice(1);
    var longUrl = urlService.getLongUrl(shortUrl, req.app.shortToLongHash);


    //  find longUrl in the ?JSON file?

    //var longUrl = "";
    //res.redirect(longUrl);


    //  redirect
    res.redirect(longUrl);
});

module.exports = router;


