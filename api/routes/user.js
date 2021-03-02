const User = require('../model/user');

function transformUser(user){
    return {
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        premiere_connexion: user.premiere_connexion,
        image: user.image
    };
}

function getUser(req, res){
    res.send(transformUser(req.user));
}

module.exports = { getUser };
