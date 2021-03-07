const express = require('express');
const app = express();
const assignment = require('../routes/assignments');
const {checkAdmin, checkTeacher} = require("../account");

app.route('/assignments')
    .get(assignment.getAssignments);

app.route('/assignments/:id')
    .get(assignment.getAssignment)
    .delete(checkAdmin ,assignment.deleteAssignment);

app.route('/assignments')
    .post(checkTeacher, assignment.postAssignment)
    .put(checkTeacher, assignment.updateAssignment);

module.exports = app;
