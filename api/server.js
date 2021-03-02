const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./config');
const AuthController = require('./controller/authController')
const UserController = require('./controller/userController')
const AssignmentController = require('./controller/assignmentController')

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify:false
};

mongoose.connect(config.mongoDB_uri, options)
  .then(() => {
    console.log("Connecté à la base MongoDB assignments dans le cloud !");
    console.log("at URI = " + config.mongoDB_uri);
    console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
    err => {
      console.log('Erreur de connexion: ', err);
    });

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if('OPTIONS' === req.method){
      return res.sendStatus(200);
  }
  return next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

//Auth
app.use(prefix, AuthController);
//User
app.use(prefix, UserController);
//Assignments
app.use(prefix, AssignmentController);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


