var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');


//for connecting to hosted database use the url below
//var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
var url = 'mongodb://localhost:27017/audit_DB';

module.exports=function(app){

    //setup body-parser to read from view body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    

    //routes

    app.get('/field-work/tb-ledger-upload/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'tb-ledger-upload');
    });

    app.get('/field-work/investment-property/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'investment-property');        
    });

    /*app.get('/field-work/investment-property/:user', function(req, res){
        res.render('investment-property', {user:req.params.user});
    });*/

    app.post('/field-work/investment-property/:user', function(req, res){
        //create model for data to be sent to database
        var item = {
            company:req.body.company,
            engagementYearEnd:req.body.engagementYearEnd,
            preparedBy:req.body.preparedBy,
            reviewedBy:req.body.reviewedBy,
            property12014Bal:req.body.property12014Bal,
            property12014WPRef:req.body.property12014WPRef,
            property12013Bal:req.body.property12013Bal,
            property12013WPRef:req.body.property12013WPRef,
            property1TracedToTitle:req.body.property1TracedToTitle                        
        };
        
        //connect to db
        mongo.connect(url, function(err, client){
            console.log('Connected to DB');
            assert.equal(null, err); //assert to check if there is an error
            var db=client.db('audit_DB');
            db.collection('investment-property').insertOne(item, function(err, result){
                assert.equal(null, err);
                console.log(item.company+' Investment property successfully updated');
                client.close();
            });
        });

        //redirect to index route
        res.redirect('/main/:user');        
    });

    app.get('/field-work/intangible-assets-a/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'intangible-assets-a');
    });

    app.get('/field-work/intangible-assets-b/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'intangible-assets-b');
    });

    app.get('/field-work/intangible-assets-c/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'intangible-assets-c');
    });

    app.get('/field-work/group-loans/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'group-loans');
    });
}

function connectToDBDisplayEngagementCard(res, req, page) {
    var companyArray = [];
    var yearEndArray = [];
    mongo.connect(url, function (err, client) {
        assert.equal(null, err); //assert to check if there is an error
        var db = client.db('audit_DB');
        var cursor = db.collection('test-pre-engagement').find();
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            companyArray.push(doc.company);
            yearEndArray.push(doc.engagementYearEnd);
        }, function () {
            client.close();
            res.render(page, { items: companyArray, itemsYear: yearEndArray, user: req.params.user }); //this is the last line of code. continue from here                
            console.log(companyArray);
            console.log(yearEndArray);
        });
    });
}
