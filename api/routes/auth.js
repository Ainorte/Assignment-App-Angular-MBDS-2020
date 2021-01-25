const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/user');

function login(req, res){
   const email = req.body.email;
   const password = req.body.password;

   console.log("Connexion avec email : " + email);

   User.findOne({email: email}, (err, user) =>{
        //Erreur sur mongo
        if(err) {
            console.log(err)
            return res.status(500).send('Erreur sur le serveur.');
        }
        //Identifiant ou mot de passe incorrect, on ne donne pas trop d'informations pour la sécurité.
        if(!user || !bcrypt.compareSync(password, user.password))
            return res.status(401).send({ auth: false, token: null, message: 'Identifiant et/ou mot de passe incorrects.' })

        //Créer le token de connexion.
        const token = jwt.sign({id: user._id}, config.JWT_secret, {expiresIn: config.JWT_expireTime});

        //Retourne le token
        return res.status(200).send({ auth: true, token: token, message: 'Connexion réussie.' });
   });
}

function changePassword(req, res){
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    console.log("user :" + req.user._id + " : édite mot de passe");

    User.findByIdAndUpdate(req.user._id, {password: hashedPassword}, (err, user) =>{
        if(err){
            console.log(err)
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.status(200).send({message: 'Mot de passe modifié.'})

    });
}

module.exports = { login, changePassword };
