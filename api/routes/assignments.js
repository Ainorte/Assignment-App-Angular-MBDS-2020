const Assignment = require('../model/assignment');
const {getPagination} = require("../tools");

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    
    const { page, l, rendu } = req.query;
    const { limit, offset } = getPagination(page, l);

    let aggregate = Assignment.aggregate();

    if(JSON.parse(rendu)){
        aggregate  = rendu != null ? Assignment.aggregate([{$match : {"note":{$exists:true}}}]) : Assignment.aggregate();
    }
    else{
        aggregate = rendu != null ? Assignment.aggregate([{$match : {"note":{$exists:false}}}]) : Assignment.aggregate();
    }


    Assignment.aggregatePaginate(aggregate ,{offset, limit}, (err, data) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.send(data);
    })
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res){
    let assignmentId = req.params.id;

    Assignment.findOne({_id: assignmentId}, (err, assignment) =>{
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res){
    let assignment = new Assignment();
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.matiere = req.body.matiere;
    assignment.eleve = req.body.eleve;
    assignment.prof = req.body.prof;

    if(assignment.nom === undefined ||
        assignment.dateDeRendu === undefined ||
        assignment.matiere === undefined ||
        assignment.eleve === undefined ||
        assignment.prof === undefined){
        return res.status(400).send('Requête incomplète.');
    }

    console.log("Ajout assignment :");
    console.log(assignment)

    assignment.save( (err) => {
        if(err){
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        return res.json({ message: 'Devoir enregistré.'})
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("mise à jour assignment : ");
    console.log(req.body);
    Assignment.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, assignment) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }

        return res.json({message: 'Devoir mis à jour.'})
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    console.log("Suppression assignment : " + req.params.id);

    Assignment.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur sur le serveur.');
        }
        res.json({message: 'Devoir supprimé'});
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };
