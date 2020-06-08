var mongo = require('mongodb');
var assert = require('assert');
var bodyParser = require('body-parser');


//for connecting to hosted database on MongoDB Atlas use the url below
//var url = 'mongodb+srv://audit_user:AnwUpqUPsAZH5sHk@auditdb-ns96y.mongodb.net/test?retryWrites=true&w=majority';

//for connecting to local database use the url below
var url = 'mongodb://localhost:27017/audit_DB';



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
            date:req.body.today,
            wpRef:'10.14A',
            commWithPrevAuditors:req.body.yesNoNAA,
            communicateCommentsA:req.body.communicateCommentsA,
            ascertainIfAdvisedAccountant:req.body.yesNoNAB,
            ascertainCommentsB:req.body.ascertainCommentsB,
            didWeRequestPerm:req.body.yesNoNAC,
            satisfiedCommentsC:req.body.satisfiedCommentsC,
            didWeDecline:req.body.yesNoNAD,
            permissionCommentsD:req.body.permissionCommentsD,
            didWeAsk:req.body.yesNoNAE,
            accountantCommentsE:req.body.accountantCommentsE,
            didWeAttemptToCommWithExistingAcc:req.body.yesNoNAF,
            replyCommentsF:req.body.replyCommentsF,
            discWithThirdParties:req.body.yesNoNAG,
            discussionsCommentsG:req.body.discussionsCommentsG,
            inquiriesOfOtherFirmPersonnel:req.body.yesNoNAH,
            inquiriesCommentsH:req.body.inquiriesCommentsH,
            inquiriesOfThirdParties:req.body.yesNoNAI,
            thirdCommentsI:req.body.thirdCommentsI,
            performBackgroundSearches:req.body.yesNoNAJ,
            backgroundCommentsJ:req.body.backgroundCommentsJ,
            honestRelationship:req.body.yesNoNAK,
            honestCommentsK:req.body.honestCommentsK,
            highRiskClient:req.body.yesNoNAL,
            managedCommentsL:req.body.managedCommentsL,
            changesInManagement:req.body.yesNoNAM,
            changesCommentsM:req.body.changesCommentsM,
            solvencyLevels:req.body.yesNoNAN,
            solvencyCommentsN:req.body.solvencyCommentsN,
            dominantIndividual:req.body.yesNoNAO,
            dominantCommentsO:req.body.dominantCommentsO,
            historyOfLawsuits:req.body.yesNoNAP,
            lawsuitsCommentsP:req.body.lawsuitsCommentsP,
            otherOffices:req.body.yesNoNAQ,
            otherEngagementsCommentsQ:req.body.otherEngagementsCommentsQ,
            identityKnown:req.body.yesNoNAR,
            identityCommentsR:req.body.identityCommentsR,
            businessReputation:req.body.yesNoNAS,
            reputationCommentsS:req.body.reputationCommentsS,
            familiarWithOps:req.body.yesNoNAT,
            familiarCommentsT:req.body.familiarCommentsT,
            informationConcerningAttitude:req.body.yesNoNAU,
            attitudeCommentsU:req.body.attitudeCommentsU,
            concernedWithMaintainingFees:req.body.yesNoNAV,
            aggresivelyCommentsV:req.body.aggresivelyCommentsV,
            inappropriateLimitation:req.body.yesNoNAW,
            limitationCommentsW:req.body.limitationCommentsW,
            involvedInMoneyLaundering:req.body.yesNoNAX,
            launderingCommentsX:req.body.launderingCommentsX,
            activitiesOfNOCLAR:req.body.yesNoNAY,
            noclarCommentsY:req.body.noclarCommentsY,
            reasonsForAppointment:req.body.yesNoNAZ,
            appointmentCommentsZ:req.body.appointmentCommentsZ,
            knowledgeOfIndustry:req.body.yesNoNAAA,
            industryCommentsAA:req.body.industryCommentsAA,
            experienceWithRequirements:req.body.yesNoNAAB,
            experienceCommentsAB:req.body.experienceCommentsAB,
            sufficientPersonnel:req.body.yesNoNAAC,
            personnelCommentsAC:req.body.personnelCommentsAC,
            expertsAvailable:req.body.yesNoNAAD,
            expertsCommentsAD:req.body.expertsCommentsAD,
            eqcrAvailable:req.body.yesNoNAAE,
            eqcrCommentsAE:req.body.eqcrCommentsAE,
            ableToComplete:req.body.yesNoNAAF,
            deadlineCommentsAF:req.body.deadlineCommentsAF,
            specialisedIndustryFactors:req.body.yesNoNAAG,
            factorsCommentsAG:req.body.factorsCommentsAG,
            significantBranches:req.body.yesNoNAAH,
            branchesCommentsAH:req.body.branchesCommentsAH,
            deadlineCoincideWithPressures:req.body.yesNoNAAI,
            pressuresCommentsAI:req.body.pressuresCommentsAI,
            independenceThreats:req.body.yesNoNAAJ,
            independenceCommentsAJ:req.body.independenceCommentsAJ,
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
        //res.redirect('/main/:user');
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
            date:req.body.today,
            wpRef:'10.14B',
            honestRelationship:req.body.yesNoNAA,
            communicateCommentsA:req.body.communicateCommentsA,
            canHighRiskClientBeManaged:req.body.yesNoNAB,
            ascertainCommentsB:req.body.ascertainCommentsB,
            changesInManagement:req.body.yesNoNAC,
            satisfiedCommentsC:req.body.satisfiedCommentsC,
            clientSolvency:req.body.yesNoNAD,
            permissionCommentsD:req.body.permissionCommentsD,
            historyOfLawsuits:req.body.yesNoNAE,
            accountantCommentsE:req.body.accountantCommentsE,
            identityOfPrincipal:req.body.yesNoNAF,
            replyCommentsF:req.body.replyCommentsF,
            businessReputationofPrincipal:req.body.yesNoNAG,
            discussionsCommentsG:req.body.discussionsCommentsG,
            informationConcerningAttitude:req.body.yesNoNAH,
            inquiriesCommentsH:req.body.inquiriesCommentsH,
            clientAggressivelyConcerned:req.body.yesNoNAI,
            thirdCommentsI:req.body.thirdCommentsI,
            indicationOfInappropriateLimitation:req.body.yesNoNAJ,
            backgroundCommentsJ:req.body.backgroundCommentsJ,
            sufficientKnowledgeOfIndustry:req.body.yesNoNAK,
            honestCommentsK:req.body.honestCommentsK,
            experienceWithRegulatory:req.body.yesNoNAL,
            managedCommentsL:req.body.managedCommentsL,
            sufficientPersonnel:req.body.yesNoNAM,
            changesCommentsM:req.body.changesCommentsM,
            expertsAvailable:req.body.yesNoNAN,
            solvencyCommentsN:req.body.solvencyCommentsN,
            eqcrAvailable:req.body.yesNoNAO,
            dominantCommentsO:req.body.dominantCommentsO,
            specialisedIndustryFactors:req.body.yesNoNAP,
            lawsuitsCommentsP:req.body.lawsuitsCommentsP,
            significantBranches:req.body.yesNoNAQ,
            otherEngagementsCommentsQ:req.body.otherEngagementsCommentsQ,
            consideredPartnerRootation:req.body.yesNoNAR,
            identityCommentsR:req.body.identityCommentsR,
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
        //res.redirect('/main/:user');
        console.log('Continuance Evaluation record created for client: '+req.body.company);
        //res.render('client-acceptance', {user:req.params.user});
    });

    app.get('/pre-engagement/finalize-pre-engagement/:user', function(req, res){
        connectToDBDisplayFailedClients(res, req, 'finalize-pre-engagement');
    });

    app.get('/pre-engagement/edit-failed-pre-engagement/:user', function(req, res){
        connectToDBDisplayFailedClients(res, req, 'edit-failed-pre-engagement');
    });
    
};

function connectToDBDisplayFailedClients(res, req, page) {
    var companyArray = [];
    var yearEndArray = [];
    var wpRefArray = [];
    mongo.connect(url, function (err, client) {
        assert.equal(null, err); //assert to check if there is an error
        var db = client.db('audit_DB');
        var cursor = db.collection('test-pre-engagement').find({auditAuthorised:false});
        cursor.forEach(function (doc, err) {
            assert.equal(null, err);
            companyArray.push(doc.company);
            yearEndArray.push(doc.engagementYearEnd);
            wpRefArray.push(doc.wpRef);
        }, function () {
            client.close();
            res.render(page, { items: companyArray, itemsYear: yearEndArray, itemsWpRef:wpRefArray, user: req.params.user }); //this is the last line of code. continue from here                
            console.log(companyArray);
            console.log(yearEndArray);
        });
    });
}