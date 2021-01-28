const matiere = require('../model/matiere');
const Matiere = require('../model/matiere');
const {getPagination} = require("../tools");

// Récupérer toutes les matieres (GET)
function getMatieres(req, res){
    
    const { page, l } = req.query;
    const { limit, offset } = getPagination(page, l);

    Matiere.aggregatePaginate(aggregate ,{offset, limit}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.send(data);
    })
}

// Récupérer une matière par son nom (GET)
function getMatiere(req, res){
    let matiereId = req.params.id;

    Matiere.findOne({_id: matiereId}, (err, matiere) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json(matiere);
    })
}

// Ajout d'une matiere (POST)
function postMatiere(req, res){
    let matiere = new Matiere();
    matiere.id = req.body.id;
    matiere.nom = req.body.nom;
    matiere.image = req.body.image;
    assignment.rendu = req.body.rendu;

    console.log("Ajout matière :");
    console.log(matiere)

    matiere.save( (err) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json({ message: 'Matière enregistrée.'})
    })
}

// Update d'une matiere (PUT)
function updateMatiere(req, res) {
    console.log("mise à jour matière : ");
    console.log(req.body);
    Matiere.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, matiere) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.json({message: 'Matière mise à jour.'})
    });

}

// suppression d'une matière (DELETE)
function deleteMatiere(req, res) {
    console.log("Suppression matière : " + req.params.id);

    Matiere.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        res.json({message: 'Matière supprimée'});
    })
}



module.exports = { getMatiere, postMatiere, getMatieres, updateMatiere, deleteMatiere };
