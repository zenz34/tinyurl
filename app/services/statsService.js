var geoip = require('geoip-lite');
var RequestModel = require('../models/requestModel');

var logRequest = function (shortUrl, req) {


    console.log("statsService.js   Come here!  ");

    var reqInfo = {};
    reqInfo.shortUrl = shortUrl;
    //  referrer where does it come from      if directly input the url no referrer
    reqInfo.referrer = req.headers.referrer || 'Unknown';
    reqInfo.platform = req.useragent.platform || 'Unknown';
    reqInfo.browser = req.useragent.browser || 'Unknown';

    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
    reqInfo.browser = req.useragent.browser || 'Unknown';

    var geo = geoip.lookup(ip);
    if (geo) {
        reqInfo.country = geo.country;
    } else {
        reqInfo.country = 'Unknown';
    }


    console.log("statsService.js   start to save!  ");

    reqInfo.timestamp = new Date();
    var request = new RequestModel(reqInfo);
    request.save();

    console.log("statsService.js   save done!  ");
};

var getUrlInfo = function (shortUrl, info, callback) {
    if (info === 'totalClicks') {
        RequestModel.count({ shortUrl: shortUrl }, function (err, data){
            console.log("   statsService.js  getUrlInfo  count  shortUrl = " + data);
            callback(data);
        });
        return;
    }

    var groupId = "";

    if (info === 'hour') {
        groupId = {
            year: {$year: "$timestamp"},
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"},
            hour: {$hour: "$timestamp"},
            minutes: {$minute: "$timestamp"}
        }
    } else if (info === 'day') {
        groupId = {
            year: {$year: "$timestamp"},
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"},
            hour: {$hour: "$timestamp"}
        }
    } else if (info === 'month') {
        groupId = {
            year: {$year: "$timestamp"},
            month: {$month: "$timestamp"},
            day: {$dayOfMonth: "$timestamp"}
        }
    } else {
        groupId = "$" + info;
    }

    RequestModel.aggregate([
        {
            $match: {
                shortUrl: shortUrl
            }
        },
        {
            $sort: {
                timestamp: -1
            }
        },
        {
            $group: {
                _id: groupId,
                count: {
                    $sum: 1
                }
            }
        }
    ], function (err, data) {
        callback(data);
    });
};

module.exports = {
    logRequest: logRequest,
    getUrlInfo: getUrlInfo
};