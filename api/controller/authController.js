const express = require('express');
const app = express();
const auth = require('../routes/auth');
const {checkAccount, checkAdmin} = require("../account");

//création des utilisateur par le compte admin
app.route('/register')
    .post(checkAdmin, auth.register);

app.route('/login')
    .post(auth.login);

app.route('/changepassword')
    .post(checkAccount, auth.changePassword)

module.exports = app;
