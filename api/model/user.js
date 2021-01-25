const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    prenoms: String,
    nom: String,
    email: String,
    password: String,
    roles: String,
    premiere_connexion: Boolean,
    image: String
});

UserSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);
