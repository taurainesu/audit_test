var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');


//for connecting to hosted database use the url below
//var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
var url = 'mongodb://localhost:27017/audit_DB';

module.exports = function(app){

    //setup body-parser to read from view body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //routes
    app.get('/work-papers/work-papers-by-client/:user', function(req, res){
        connectToDBDisplayEngagementCard(res, req, 'work-papers-by-client');
    });
}

function connectToDBDisplayEngagementCard(res, req, page) {
    var companyArray = [];
    var yearEndArray = [];
    mongo.connect(url, function (err, client) {
        assert.equal(null, err); //assert to check if there is an error
        var db = client.db('audit_DB');
        var cursor = db.collection('test-pre-engagement').find({auditAuthorised:true});
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