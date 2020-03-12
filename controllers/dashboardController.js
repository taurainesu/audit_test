module.exports=function(app){
    app.get('/main/:user', function(req,res){
        res.render('main', {user: req.params.user});
    });
}