var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = (function(app){
    
// Login TO DB==================================================================
    app.post('/',urlencodedParser,function(req,res){
        res.redirect('/main/:user');
    });

    app.get('/', function(req, res){
        res.render('login', {user:req.params.user});
    });

    app.get('/login ', function(req, res){
        res.render('login', {user:req.params.user});
    });

});