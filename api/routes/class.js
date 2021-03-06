const classes = require('../model/class')
const {getPagination} = require("../tools");

function getClasses(req, res){

    const { page, l} = req.query;
    const { limit, offset } = getPagination(page, l);

    classes.aggregatePaginate(classes.aggregate() ,{offset, limit}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.send(data);
    })
}

function getClass(req, res){
    let classId = req.params.id;

    classes.findOne({_id: classId}, (err, classe) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json(classe);
    })
}

function postClass(req, res){
    let classe = new classes();
    classe.nom = req.body.nom;

    console.log("Ajout classe :");
    console.log(classe)

    classe.save( (err) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json({ message: 'Devoir enregistré.'})
    })
}

function updateClass(req, res) {
    console.log("mise à jour classe : ");
    console.log(req.body);
    classes.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.json({message: 'Devoir mis à jour.'})
    });

}

function deleteClass(req, res) {
    console.log("Suppression classe : " + req.params.id);

    classes.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        res.json({message: 'Classe supprimé'});
    })
}



module.exports = { getClasses, getClass, postClass, updateClass, deleteClass };
