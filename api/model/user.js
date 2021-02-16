const mongoose = require('mongoose');
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
const Schema = mongoose.Schema;
const Roles = require("../model/roles");

const UserSchema = Schema({
    prenom: String,
    nom: String,
    email: String,
    password: String,
    role: {
        enum: Object.values(Roles),
        type: String,
    },
    premiere_connexion: Boolean,
    image: String
});

UserSchema.plugin(aggregatePaginate);

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('User', UserSchema);
