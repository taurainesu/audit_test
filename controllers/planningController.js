var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');


//for connecting to hosted database use the url below
var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
//var url = 'mongodb://localhost:27017/audit_DB';

module.exports=function(app){

    //setup body-parser to read from view body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    

    //routes
    app.get('/planning/assessment-of-staff-for-engagement/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'assessment-of-staff-for-engagement');
    });

    app.get('/planning/risk-assessment-a/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'risk-assessment-a');
    });

    app.post('/planning/risk-assessment-a/:user', function(req, res){
        //create model for data to be sent to database
        var item = {
            company:req.body.company,
            engagementYearEnd:req.body.engagementYearEnd,
            preparedBy:req.body.preparedBy,
            reviewedBy:req.body.reviewedBy,
            fraudCorruptionRiskCategory:req.body.fraudCorruptionRiskCategory,
            fraudCorruptionRiskProcedures:req.body.fraudCorruptionRiskProcedures,
            fraudCorruptionRiskSignificant:req.body.fraudCorruptionRiskSignificant,
            fraudCorruptionRiskExplanation:req.body.fraudCorruptionRiskExplanation,
            fraudCorruptionRiskWPReference:req.body.fraudCorruptionRiskWPReference                        
        };
        console.log(item.company+' '+ item.engagementYearEnd+' '+ item.preparedBy+' '+item.reviewedBy);
        //connect to db
        mongo.connect(url, function(err, client){
            console.log('Connected to DB');
            assert.equal(null, err); //assert to check if there is an error
            var db=client.db('audit_DB');
            db.collection('risk-assessment-a').insertOne(item, function(err, result){
                assert.equal(null, err);
                console.log(item.company+' Risks at FSL successfully updated');
                client.close();
            });
        });

        //redirect to index route
        res.redirect('/main/:user');
    });

    app.get('/planning/risk-assessment-b/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'risk-assessment-b');
    });

    app.get('/planning/risk-assessment-c/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'risk-assessment-c');
    });

    app.get('/planning/risk-assessment-d/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'risk-assessment-d');
    });

    app.get('/planning/identifying-risks-through-understanding-the-entity/:user', function(req,res){
        connectToDBDisplayEngagementCard(res, req, 'identifying-risks-through-understanding-the-entity');
    });

    app.get('/planning/client-service-plan/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'client-service-plan');
    });    
}

function connectToDBDisplayEngagementCard(res, req, page) {
    var companyArray = [];
    var yearEndArray = [];
    mongo.connect(url, function (err, client) {
        assert.equal(null, err); //assert to check if there is an error
        var db = client.db('audit_DB');
        var cursor = db.collection('test-pre-engagement').find({aboveThreshold:true});
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