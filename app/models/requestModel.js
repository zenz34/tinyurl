var mongoose = require('mongoose');
var schema = mongoose.Schema;

var RequestSchema = new schema({
    shortUrl: String,
    referrer: String,
    platform: String,
    browser: String,
    country: String,
    timestamp: Date
});

var requestModel = mongoose.model('RequestModel', RequestSchema);

module.exports = requestModel;