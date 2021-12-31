const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const route = require('./routes');
const {create} = require('express-handlebars');
const session = require('express-session');
const bodyParser = require("body-parser");
const passport = require('./passport');

const db = require('./config/db');
//connect to databse
db.connect();

const app = express();

const hbs = create({
    // Specify helpers which are only registered on this instance.
    extname: '.hbs',
    helpers: {
        getValue: (obj, idx) => obj[idx],
        sum: (a,b) => a+b,
        length: (obj) => obj.length,
        increase: (n) => n+1,
        getPage: (total, limit) => total % limit + 1,
        for: function(from, to, incr, block) {
            let accum = '';
            for(let i = from; i <= to; i += incr)
                accum += block.fn(i);
            return accum;
        },
    }
});
app.engine('hbs', hbs.engine);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "my-super-secret-key",
    resave: true,
    saveUninitialized: true,
    cookie: {maxAge: 60000}}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
    res.locals.user = req.user;
    next();
});

app.get('*', function (req, res, next){
    res.locals.cart = req.session.cart;
    res.locals.totalOrderPrice = req.session.totalOrderPrice;
    next();
});


//Handle route
route(app);

module.exports = app;
