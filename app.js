var express = require("express");
const index = require("./routes/index.js");
var path = require("path");
var logger=require("morgan");
const users = require("./routes/user.js");
const passport = require("passport");
const session = require("express-session");
var cookie=require("cookie-parser");

var app = express();

// engine setup
app.set("views", path.join(__dirname, "obviously"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,'public')));


//this is used to log all the data available while communicating with server like-"GET /users 200 5.231 ms - 45" means -This indicates that a GET request was made to the "/users" endpoint, returned a 200 status code, took 5.231 milliseconds to process, and sent a response of 45 bytes. 
app.use(logger('dev'));


//session-setup
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: "holo bhola",
  })
);
//passport-setup
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
// When a client sends a POST request with a JSON payload in the request body, this middleware will parse that JSON and make it available in the req.body property of the request object.
app.use(express.json());
//used to parse incoming request bodies with URL-encoded payloads//dos attacks if true because it will use 'qs' library for parsing URL encoded datad
app.use(express.urlencoded({ extended: false }));

//setting up cookie-parser
app.use(cookie());
//setting up static file in public
// setting -routes
app.use("/", index);
// app.use("/profile",profile);

app.listen(3000, function () {
  console.log(
    "The web server is running. Please open http://localhost:3000/ in your browser."
  );
});
