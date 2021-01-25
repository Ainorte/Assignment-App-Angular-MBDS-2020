const Assignment = require('../model/assignment');
const {getPagination} = require("../tools");

// Récupérer tous les assignments (GET)
function getAssignments(req, res){
    
    const { page, l, rendu } = req.query;
    const { limit, offset } = getPagination(page, l);

    const aggregate = rendu != null ? Assignment.aggregate([{$match: {rendu: JSON.parse(rendu)}}]) : Assignment.aggregate();

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
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;

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
