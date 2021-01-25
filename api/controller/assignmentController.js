const express = require('express');
const app = express();
const assignment = require('../routes/assignments');

app.route('/assignments')
app.route('/assignments')
    .get(assignment.getAssignments);

app.route('/assignments/:id')
    .get(assignment.getAssignment)
    .delete(assignment.deleteAssignment);

app.route('/assignments')
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);

module.exports = app;
