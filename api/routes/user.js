const User = require('../model/user');
const Role = require("../model/roles");
const {getPagination} = require("../tools");

function transformUser(user){
    return {
        _id: user._id,
        prenom: user.prenom,
        nom: user.nom,
        email: user.email,
        role: user.role,
        premiere_connexion: user.premiere_connexion,
        image: user.image
    };
}

function getMe(req, res){
    res.send(transformUser(req.user));
}

function getUser(req, res){
    let userId = req.params.id;
    User.findOne({_id: userId}, (err, user) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json(transformUser(user));
    })
}

function getUsers(req, res){
    const { page, l, students } = req.query;
    const { limit, offset } = getPagination(page, l);

    let aggregate = User.aggregate();

    if(students != null && JSON.parse(students)){
        aggregate = User.aggregate([{$match: {role: Role.STUDENT }}]);
    }
    else if (students != null && !JSON.parse(students)){
        aggregate = User.aggregate([{$match: {$or: [{role: Role.TEACHER }, {role: Role.ADMIN }]}}]);
    }


    User.aggregatePaginate(aggregate ,{offset, limit}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.send(data);
    })
}

module.exports = { getUser, getMe, getUsers };
