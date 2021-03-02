const express = require('express');
const app = express();
const auth = require('../routes/auth');
const account = require("../account");

//Non utilisée, création des utilisateur par le compte admin
/*app.route('/register')
    .post(auth.register);*/

app.route('/login')
    .post(auth.login);

app.route('/changepassword')
    .post(account, auth.changePassword)

module.exports = app;
