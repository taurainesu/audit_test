var bodyParser = require('body-parser');

var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var assert = require('assert');

//for connecting to hosted database use the url below
//var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
var url = 'mongodb://localhost:27017/audit_DB';

//connect to mongodb 
mongo.connect(url, function(err, client){
    console.log('Connected to database for authentication');
    console.log(url);
    assert.equal(null, err); //assert to check if there is an error
    var db=client.db('audit_DB');
    console.log(db.databaseName);
});

//configure local Strategy for Passport
passport.use(new Strategy(
    function(username, password, cb) {
      db.users.findByUsername(username, function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        if (user.password != password) { return cb(null, false); }
        return cb(null, user);
      });
    }));


//Configure Passport authenticated session persistence
passport.serializeUser(function(user, cb) {
    cb(null, user.id);
  });
  
  passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });





module.exports = (function(app){
    
    // Initialize Passport and restore authentication state, if any, from the session.
    app.use(passport.initialize());
    app.use(passport.session());

    app.post('/login', 
    passport.authenticate('local', { failureRedirect: '/failedAuthenticate' }),
    function(req, res) {
        res.redirect('/main/:user');
    });

    app.get('/failedAuthenticate', (req, res)=>{
      res.render('faiedAuthenticate');
    });


    app.get('/', function(req, res){
        res.render('login', {user:req.params.user});
    });

    app.get('/login', function(req, res){
        res.render('login', {user:req.params.user});
    });

});