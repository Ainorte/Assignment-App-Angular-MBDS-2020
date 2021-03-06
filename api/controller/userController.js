const express = require('express');
const app = express();
const {checkAccount, checkAdmin} = require("../account");
const user = require("../routes/user")

app.route('/user')
    .get(checkAccount, user.getUser);

app.route('/users')
    .get(checkAdmin, user.getUsers);

module.exports = app;
