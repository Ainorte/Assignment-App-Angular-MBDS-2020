const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const AssignmentSchema = Schema({
    dateDeRendu: Date,
    nom: String,
    note: Number,
    remarque: String,
    matiere: String,
    eleve: { type: Schema.Types.ObjectId, ref: 'User' },
    prof: { type: Schema.Types.ObjectId, ref: 'User' }
});

AssignmentSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
