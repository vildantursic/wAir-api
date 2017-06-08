const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('express-jwt');
const fs = require('fs');
const publicKey = fs.readFileSync('./public.pub');
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// app.use(jwt({secret: publicKey}).unless({path: ['/login', '/signup']}));

var auth = require('./routes/auth');
var sensor = require('./routes/sensor');
var statistic = require('./routes/statistic');

app.use('/api/v1/', auth);
app.use('/api/v1/', sensor);
app.use('/api/v1/', statistic);


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});