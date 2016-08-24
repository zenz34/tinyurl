/**
 * Created by zhenkangzhao15mbp on 8/19/16.
 */





var express = require('express');
var router = express.Router();


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();


var urlService = require('../services/urlService');

router.post('/urls', jsonParser, function(req, res) {
    //  longUrl to shortUrl
    //  1 0-9 a-z A-Z  2 random  3
    /*
    res.send("Hello World!");


    var code = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
    'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var len = 0;
*/
    var longUrl = req.body.longUrl;

    var shortUrl = urlService.getShortUrl(longUrl, req.app.longToShortHash, req.app.shortToLongHash);

    res.json({
        shortUrl: shortUrl,
        longUrl: longUrl
    });
/*
    len = longUrl.length;

    while (len) {
        //  pick one character in index[len % 62];
        shortUrl += code[len % 62];
        len /= 62
    }
    //  convert longUrl to shortUrl

    console.log(shortUrl);



    res.json({
        shortUrl: shortUrl,
        longUrl: req.body.longUrl
    });
*/
});

router.get("/urls/:shortUrl", function (req, res) {
    var shortUrl = req.params.shortUrl;
    var longUrl = urlService.getLongUrl(shortUrl, req.app.shortToLongHash);
    if (longUrl) {
        res.json({
            shortUrl: shortUrl,
            longUrl: longUrl
        });
    } else {
        res.status(404).send("what???????????");
    }
});

module.exports = router;


