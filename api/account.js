const jwt = require('jsonwebtoken');
const User = require('./model/user');
const config = require('./config');

function checkAccount(req, res, next){
    const token = req.headers['x-access-token'];

    console.log("Contrôle du token")

    if (!token)
        return res.status(403).send('Aucun token fourni.');

    jwt.verify(token, config.secret, function(err, decoded) {
        if (err){
            console.log(err);
            return res.status(500).send('Token non reconnu.');
        }

        User.findById(req.userId, { password: 0 }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500).send('Erreur sur le serveur.');
            }
            if (!user) return res.status(404).send('Utilisateur non reconnu');

            req.user = user;

            next();
        });
    });

}

module.exports = checkAccount;
