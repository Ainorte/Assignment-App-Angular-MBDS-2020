const express = require('express');
const app = express();
const classe = require('../routes/class');
const {checkAccount, checkAdmin} = require("../account");

app.route('/classes')
    .get(checkAccount ,classe.getClasses);

app.route('/classes/:id')
    .get(checkAccount,classe.getClass)
    .delete(checkAdmin, classe.deleteClass);

app.route('/classes')
    .post(checkAdmin, classe.postClass)
    .put(checkAdmin, classe.updateClass);

module.exports = app;
