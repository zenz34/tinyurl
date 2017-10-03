var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var redirectRouter = require('./routes/redirect');
var mongoose = require('mongoose');
var useragent = require('express-useragent');

mongoose.connect('mongodb://user:user@ds161255.mlab.com:61255/tinyurl');
app.use('/node_modules', express.static(__dirname + "/node_modules"));
// for call angular js files
app.use('/public', express.static(__dirname + "/public"));

app.use(useragent.express());   //  get request

app.use('/api/v1', restRouter);

app.use('/', indexRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);









