/**
 * Created by zhenkangzhao15mbp on 8/21/16.
 */





var encode = [];

var genCharArray = function (charA, charZ) {
    //console.log("come here!  genCharArray start");

    var arr = [];
    var i = charA.charCodeAt(0);
    var j = charZ.charCodeAt(0);

    for (; i <= j; i++) {
        arr.push(String.fromCharCode(i));
    }

    //console.log("come here!  genCharArray end");

    return arr;
};

//console.log("come here!  concat begin");

encode = encode.concat(genCharArray('A', 'Z'));
encode = encode.concat(genCharArray('0', '9'));
encode = encode.concat(genCharArray('a', 'z'));

//console.log("come here!  concat end");

var getShortUrl = function (longUrl, longToShortHash, shortToLongHash) {
    //console.log("come here!  getShortUrl");


    console.log("longUrl = " + longUrl);



    if (longUrl.indexOf('http') === -1) {
        longUrl = "http://" + longUrl;
    }

    if (longToShortHash[longUrl] != null) {
        return longToShortHash[longUrl];
    } else {
        var shortUrl = generateShortUrl(longToShortHash);
        longToShortHash[longUrl] = shortUrl;
        shortToLongHash[shortUrl] = longUrl;
        return shortUrl;
    }
};

var convertTo62 = function (num) {
    //console.log("come here!  convertTo62");

    var result = '';
    do {
        result = encode[num % 62] + result;
        num = Math.floor(num / 62);
    } while (num);

    return result;
};

var generateShortUrl = function (longToShortHash) {


    console.log("key length of longToShortHash  = " + Object.keys(longToShortHash).length);
    return convertTo62(Object.keys(longToShortHash).length);
};


var getLongUrl = function (shortUrl, shortToLongHash) {
    ////console.log("come here!  getLongUrl");

    return shortToLongHash[shortUrl];
};

////console.log("come here!  module exports");

module.exports = {
    getShortUrl: getShortUrl,
    getLongUrl: getLongUrl
};


