var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var assert = require('assert');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/User');
var flash = require('express-flash');
var session = require('express-session');


//for connecting to hosted database use the url below
// var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
var url = 'mongodb://localhost:27017/audit_DB';

//connect to mongodb
mongoose.connect(url, {useNewUrlParser : true, useUnifiedTopology: true,})
    .then(()=>console.log('connected to db'))
    .catch(err => console.log(err));


//configure local Strategy for Passport
module.exports = (function(app){
    var sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/');
        } else {
            next();
        }
    };
    app.use(flash());
    app.use(session({ cookie: { maxAge: 60000 },
        secret: 'woot',
        resave: false,
        saveUninitialized: false}));

    passport.use('local', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
        }, (req,username, password, done) =>{
            //Find User
            User.findOne({username:username})
                .then(user =>{
                    if (!user){
                        return done(null, false, {message : 'Email is not registered'});
                    }

                    //Match password
                    if(password == user.password){
                        // console.log(user)
                        return done(null, user);
                    }else{
                        return  done( null, false, {message: 'Password is incorrect'});
                    }

                    // bcrypt.compare(password, user.password, (err, isMatch) => {
                    //     if(err) throw err;
                    //     if(isMatch){
                    //         return done(null, user);
                    //     }else{
                    //         return  done( null, false, {message: 'Password is incorrect'});
                    //     }
                    // });
                })
                .catch(err => console.log(err));
        })
    );

    //Configure Passport authenticated session persistence
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Initialize Passport and restore authentication state, if any, from the session.
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login', sessionChecker,passport.authenticate('local', {

        successRedirect: '/main/tino',
        failureRedirect: '/login',
        failureFlash: true
    }), function (req, res) {
        console.log (req.session)
        console.log(req.cookie)
        res.redirect('/main/tino');
    });

    // app.get('/failedAuthenticate', (req, res)=>{
    //   res.render('failedAuthenticate');
    // });


    app.get('/', function(req, res){
        res.render('login', {user:req.params.user, message: req.flash()});
    });

    app.get('/login', function(req, res){
        res.render('login', {user:req.params.user, message: req.flash()});
    });

    app.get('/logout', (req, res) => {
        if (req.session.user && req.cookies.user_sid) {
            res.clearCookie('user_sid');
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
    });

});