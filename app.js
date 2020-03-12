//Express
var express = require('express')
var app = express()
var fs = require('fs')
var preEngagementController = require('./controllers/preEngagementController')
var planningController = require('./controllers/planningController')
var dashboardController = require('./controllers/dashboardController')
var mainController = require('./controllers/mainController')
var loginController=require('./controllers/loginController')
var fieldWorkController=require('./controllers/fieldWorkController')

//middleware to access static files. Will check all folders for static files

app.use("/", express.static('./'))

//Morgan for logging activity to the server
var morgan = require('morgan')
app.use(morgan('combined'))

//setup template engine
app.set('view engine', 'ejs')

//setup port
app.listen(8085, ()=>{
    console.log('App is running on port 8085')
})

//fire controllers
preEngagementController(app);
planningController(app);
dashboardController(app);
mainController(app);
loginController(app);
fieldWorkController(app);

