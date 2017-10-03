var mongoose = require('mongoose');
var schema = mongoose.Schema;

var urlSchema = new schema({
    longUrl: String,
    shortUrl: String
});

var urlModel = mongoose.model('urlModel', urlSchema);

module.exports = urlModel;