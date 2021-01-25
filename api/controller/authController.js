const express = require('express');
const app = express();
const auth = require('../routes/auth');
const account = require("../account")

app.route('/login')
    .post(auth.login);

app.route('/changePassword')
    .post(account, auth.changePassword)

module.exports = app;
