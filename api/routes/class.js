const classes = require('../model/class')
const {getPagination} = require("../tools");

function getClasses(req, res){

    let { page, l} = req.query;
    let { limit, offset } = getPagination(page, l);

    if(l === 0){
        limit = 10000000;
    }

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
    classes.findOne({nom: req.body.nom}, (err, classe) => {
        //Erreur sur mongo
        if (err) {
            console.log(err)
            return res.status(500).send('Erreur sur le serveur.');
        }

        //Doublon trouvé
        if (classe) {
            console.log("Classe déjà existant");
            return res.status(400).send('Classe déjà existant.');
        }

        let c = new classes();
        c.nom = req.body.nom;

        console.log("Ajout classe :");
        console.log(c)

        c.save((err) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Erreur sur le serveur.');
            }
            return res.json({message: 'Devoir enregistré.'})
        })
    });
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
