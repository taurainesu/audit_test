var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');

//for connecting to hosted database on MongoDB Atlas use the url below
var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
//var url = 'mongodb://localhost:27017/audit_DB';



module.exports = function(app){

    //setup body-parser to read from view body
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    
    //routes
    
    app.get('/pre-engagement/client-acceptance/:user', function(req, res){
        res.render('client-acceptance', {user:req.params.user});
    });

    app.post('/pre-engagement/client-acceptance/:user', function(req, res){

        //create score counter and calculate overall score
        var scoreCount=0;
        var aboveThreshold=false;
        var auditAuthorised=false;

        function calcThreshold(){
            if(req.body.yesNoNAA=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAB=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAC=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAD=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAE=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAF=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAG=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAH=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAI=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAJ=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAK=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAL=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAM=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAN=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAO=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAP=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAQ=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAR=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAS=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAT=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAU=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAV=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAW=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAX=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAY=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAZ=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAA=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAB=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAC=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAD=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAE=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAF=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAG=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAH=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAI=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAAJ=='Yes'){scoreCount+=1}

            if(scoreCount>=32){
                aboveThreshold=true;
                auditAuthorised =true;
            }else{
                aboveThreshold=false;
            }
        }

        calcThreshold();

        //create model for data to be sent to database
        var item = {
            company:req.body.company,
            engagementYearEnd:req.body.engagementYearEnd,
            date:req.body.date,
            commWithPrevAuditors:req.body.yesNoNAA,
            ascertainIfAdvisedAccountant:req.body.yesNoNAB,
            didWeRequestPerm:req.body.yesNoNAC,
            didWeDecline:req.body.yesNoNAD,
            didWeAsk:req.body.yesNoNAE,
            didWeAttemptToCommWithExistingAcc:req.body.yesNoNAF,
            discWithThirdParties:req.body.yesNoNAG,
            inquiriesOfOtherFirmPersonnel:req.body.yesNoNAH,
            inquiriesOfThirdParties:req.body.yesNoNAI,
            performBackgroundSearches:req.body.yesNoNAJ,
            honestRelationship:req.body.yesNoNAK,
            highRiskClient:req.body.yesNoNAL,
            changesInManagement:req.body.yesNoNAM,
            solvencyLevels:req.body.yesNoNAN,
            dominantIndividual:req.body.yesNoNAO,
            historyOfLawsuits:req.body.yesNoNAP,
            otherOffices:req.body.yesNoNAQ,
            identityKnown:req.body.yesNoNAR,
            businessReputation:req.body.yesNoNAS,
            familiarWithOps:req.body.yesNoNAT,
            informationConcerningAttitude:req.body.yesNoNAU,
            concernedWithMaintainingFees:req.body.yesNoNAV,
            inappropriateLimitation:req.body.yesNoNAW,
            involvedInMoneyLaundering:req.body.yesNoNAX,
            activitiesOfNOCLAR:req.body.yesNoNAY,
            reasonsForAppointment:req.body.yesNoNAZ,
            knowledgeOfIndustry:req.body.yesNoNAAA,
            experienceWithRequirements:req.body.yesNoNAAB,
            sufficientPersonnel:req.body.yesNoNAAC,
            expertsAvailable:req.body.yesNoNAAD,
            eqcrAvailable:req.body.yesNoNAAE,
            ableToComplete:req.body.yesNoNAAF,
            specialisedIndustryFactors:req.body.yesNoNAAG,
            significantBranches:req.body.yesNoNAAH,
            deadlineCoincideWithPressures:req.body.yesNoNAAI,
            independenceThreats:req.body.yesNoNAAJ,
            scoreCount,
            aboveThreshold,
            auditAuthorised
        };
        //connect to db
        mongo.connect(url, function(err, client){
            console.log('Connected to DB');
            assert.equal(null, err); //assert to check if there is an error
            var db=client.db('audit_DB');
            db.collection('test-pre-engagement').insertOne(item, function(err, result){
                assert.equal(null, err);
                console.log(item.company+' successfully inserted');
                client.close();
            });
        });

        //redirect to index route
        res.redirect('/main/:user');
        console.log('Client Acceptance record created for client: '+req.body.company);
        //res.render('client-acceptance', {user:req.params.user});
    });

    app.get('/pre-engagement/continuance-evaluation-of-client-relationship/:user', function(req, res){
        res.render('continuance-evaluation-of-client-relationship', {user:req.params.user});
    });

    app.post('/pre-engagement/continuance-evaluation-of-client-relationship/:user', function(req, res){

        //create score counter and calculate overall score
        var scoreCount=0;
        var aboveThreshold=false;
        var auditAuthorised=false;

        function calcThreshold(){
            if(req.body.yesNoNAA=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAB=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAC=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAD=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAE=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAF=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAG=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAH=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAI=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAJ=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAK=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAL=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAM=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAN=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAO=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAP=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAQ=='Yes'){scoreCount+=1}
            if(req.body.yesNoNAR=='Yes'){scoreCount+=1}

            if(scoreCount>=14){
                aboveThreshold=true;
                auditAuthorised =true;
            }else{
                aboveThreshold=false;
            }
        }

        calcThreshold();
        

        //create model for data to be sent to database
        var item = {
            company:req.body.company,
            engagementYearEnd:req.body.engagementYearEnd,
            date:req.body.date,
            honestRelationship:req.body.yesNoNAA,
            canHighRiskClientBeManaged:req.body.yesNoNAB,
            changesInManagement:req.body.yesNoNAC,
            clientSolvency:req.body.yesNoNAD,
            historyOfLawsuits:req.body.yesNoNAE,
            identityOfPrincipal:req.body.yesNoNAF,
            businessReputationofPrincipal:req.body.yesNoNAG,
            informationConcerningAttitude:req.body.yesNoNAH,
            clientAggressivelyConcerned:req.body.yesNoNAI,
            indicationOfInappropriateLimitation:req.body.yesNoNAJ,
            sufficientKnowledgeOfIndustry:req.body.yesNoNAK,
            experienceWithRegulatory:req.body.yesNoNAL,
            sufficientPersonnel:req.body.yesNoNAM,
            expertsAvailable:req.body.yesNoNAN,
            eqcrAvailable:req.body.yesNoNAO,
            specialisedIndustryFactors:req.body.yesNoNAP,
            significantBranches:req.body.yesNoNAQ,
            consideredPartnerRootation:req.body.yesNoNAR,
            scoreCount,
            aboveThreshold,
            auditAuthorised
        };

        //connect to db
        mongo.connect(url, function(err, client){
            console.log('Connected to DB');
            assert.equal(null, err); //assert to check if there is an error
            var db=client.db('audit_DB');
            db.collection('test-pre-engagement').insertOne(item, function(err, result){
                assert.equal(null, err);
                console.log(item.company+' successfully inserted');
                client.close();
            });
        });

        //redirect to index route
        res.redirect('/main/:user');
        console.log('Continuance Evaluation record created for client: '+req.body.company);
        //res.render('client-acceptance', {user:req.params.user});
    });

    app.get('/pre-engagement/finalize-pre-engagement/:user', function(req, res){
        res.render('finalize-pre-engagement', {user:req.params.user});
    });
    
};