const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/user');
const Roles = require("../model/roles");

function register(req, res){
    const email = req.body.email;
    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const role = req.body.role;
    const image = req.body.image;

    console.log("Ajout utilisateur : " + nom + " " + prenom + " : " + email + " role : " + role);

    //Vérification non vide sur champs obligatoires
    if(!email && !nom && !prenom && !role){
        console.log("Requête incomplete")
        return res.status(400).send('Requête incomplete.');
    }

    //Vérification email
    let emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)){
        console.log("Email invalide");
        return res.status(400).send('Email invalide.');
    }

    //Vérification role existe
    if (Object.entries(Roles).includes(role)){
        console.log("Role invalide");
        return res.status(400).send('Role invalide.');
    }

    //Vérification doublon par l'email
    User.findOne({email: email}, (err, user) =>{
        //Erreur sur mongo
        if(err) {
            console.log(err)
            return res.status(500).send('Erreur sur le serveur.');
        }

        //Doublon trouvé
        if (user){
            console.log("Email déjà existant");
            return res.status(400).send('Email déjà existant.');
        }

        //Création du mot de passe
        //Source https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript
        const password = Math.random().toString(36).slice(-8);
        const hashedPassword = bcrypt.hashSync(password, 8);

        //Création de l'utilisateur
        const newUser = User.create({
            email : email,
            password : hashedPassword,
            nom : nom,
            prenom : prenom,
            image : image,
            role : role,
            premiere_connexion : true //On force l'utilisateur à changer son mot de passe à la première connexion
        }, (err,user) => {
            //On retourne le mot de passe, le mieux est d'envoyer le mot de passe par email.
            res.status(200).send({
                _id : user._id,
                password : password,
                message : 'L\'utisateur ' + email + ' à été créé avec succès.'
            });
        });
    });

}

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
            return res.status(401).send({ auth: false, token: '', message: 'Identifiant et/ou mot de passe incorrects.' })

        //Créer le token de connexion.
        const token = jwt.sign({id: user._id}, config.JWT_secret, {expiresIn: config.JWT_expireTime});

        //Retourne le token
        return res.status(200).send({ auth: true, token: token, message: 'Connexion réussie.' });
   });
}

function changePassword(req, res) {
    console.log("user " + req.user.email + " : édite mot de passe");

    if(!req.body.password){
        return res.status(400).send('Missing password.');
    }
    //hash le nouveau mot de passe
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    //Met a jour l'utilisateur courant
    User.findByIdAndUpdate(req.user._id, {password: hashedPassword, premiere_connexion: false}, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.status(200).send({message: 'Mot de passe modifié.'})

    });
}

module.exports = { register, login, changePassword };
