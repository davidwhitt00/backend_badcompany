require('dotenv').config();

var express = require("express");
var app = express();
var user = require('./controllers/usercontroller')
var sequelize = require('./db');
var bodyParser = require('body-parser');
var post = require("./controllers/postcontroller");
var games = require("./controllers/gamescontroler");

sequelize.sync(/*{force: true}*/);//tip:pass in {force: true} for resetting tables
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
//Exposed Routes
app.use('/api', user);
//Protected Routes
app.use(require('./middleware/validate-session'));
app.use('/api/post', post);
app.use('/api/games', games);
app.listen(process.env.PORT, function(){
    console.log(`App is listening on ${process.env.PORT}`)
})
