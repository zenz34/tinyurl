/*
var http = require("http");
var fs = require("fs");

http.createServer(function (req, res) {
    //console.log("server started!");
    if (req.url == "/") {
        res.writeHead(200, {"Content-Type": "text-html"});
        var html = fs.readFileSync(__dirname + "/index.html");
        res.end(html);
    }

    if (req.url == "/api") {
        res.writeHead(200, {"Content-Type": "application/json"});
        var obj = {
            name: "laowang",
            age: 80
        };
        res.end(JSON.stringify(obj));
    }

}).listen(3000);
*/
//TypeError: first argument must be a string or Buffer


/*
 var express = require('express');
 var app = express();
 var restRouter = require('./routes/rest');
 var redirectRouter = require('./routes/redirect');



 app.use('/api/v1', restRouter);

 routes.initialize(app);
 //app.use('/:shortUrl', redirectRouter);

 app.listen(3000);


 */


















var express = require('express');
var app = express();
var restRouter = require('./routes/rest');
var indexRouter = require('./routes/index');
var redirectRouter = require('./routes/redirect');

app.longToShortHash = {};
app.shortToLongHash = {};


// for call angular js files
app.use('/public', express.static(__dirname + "/public"));

app.use('/api/v1', restRouter);

app.use('/', indexRouter);

app.use('/:shortUrl', redirectRouter);

app.listen(3000);









