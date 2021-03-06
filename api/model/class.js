const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const ClassSchema = Schema({
    nom: String,
    eleves: [{type: Schema.Types.ObjectId, ref: 'User' }],
});

ClassSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Class', ClassSchema);
