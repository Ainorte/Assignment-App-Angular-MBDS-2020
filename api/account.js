const jwt = require('jsonwebtoken');
const User = require('./model/user');
const config = require('./config');

// https://etienner.github.io/api-json-web-token-authentication-jwt-sur-express-js/
// Bearer token
function extractBearerToken (headerValue) {
    if (typeof headerValue !== 'string') {
        return false
    }

    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}

function checkAccount(req, res, next){
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization);

    console.log("Contrôle du token")

    if (!token)
        return res.status(403).send('Aucun token fourni.');

    jwt.verify(token, config.JWT_secret, function(err, decoded) {
        if (err){
            console.log(err);
            return res.status(500).send('Token non reconnu.');
        }

        User.findById(decoded.id, { password: 0 }, function (err, user) {
            if (err) {
                console.log(err);
                res.status(500).send('Erreur sur le serveur.');
            }
            if (!user) return res.status(404).send('Utilisateur non reconnu');

            req.user = user;

            return next();
        });
    });

}

module.exports = checkAccount;
