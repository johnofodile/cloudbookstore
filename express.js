const express=require("express");
const path = require("path");
var expressSession = require('express-session');
var bodyParser = require('body-parser');



const PORT = process.env.PORT || 5000;

const https=require("https");

const app = express();

//controllers
var login = require('./controllers/login');
var signup = require('./controllers/signup');

var logout = require('./controllers/logout');


var customer = require('./controllers/customer');
var admin = require('./controllers/admin');

//configure
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.static("Frontend"));
//app.use(express.json({ limit: '100MB' }));
app.use(expressSession({ secret: 'my top secret pass', resave: false, saveUninitialized: true }));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));


app.use('*', function (req, res, next) {

   if (req.originalUrl == '/login' || req.originalUrl == '/signup') {
      next();
   }
   else {
      if (!req.session.admin && !req.session.customer) {
         res.redirect('/login');
         return;
      }
      next();
   }
});


//routes

app.use('/login', login);
app.use('/signup', signup);
app.use('/logout', logout);
app.use('/admin', admin);



//admin routes
//app.use('/admin', admin);


//customer routes

app.use('/customer', customer);

app.listen(PORT, function () {
   console.log("listening on http://Localhost:" + PORT);
});



//const login=require("./login.js");
//login(app,db);

const setupRESTapi=require("./rest-api");
//setupRESTapi(app,db);


