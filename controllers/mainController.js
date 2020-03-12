module.exports=function(app){
    app.get('/upload/:user', function(req, res){
        res.render('upload-assessment-of-staff-for-engagement', {user:req.params.user});
    });
}