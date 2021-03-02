const express = require('express');
const app = express();
const account = require("../account");
const user = require("../routes/user")

app.route('/user')
    .get(account, user.getUser);

module.exports = app;
