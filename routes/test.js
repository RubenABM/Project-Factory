var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var testmodel = require('../models/testmodel');

//GET Teste -> Obter todos os estudantes
router.get('/', async function (req, res, next) {
  console.log("Retrieving all students");
  let result = await testmodel.getStudents();
  console.log(result);
  res.send(result);
});

//POST Teste -> Inserir um estudante
router.post('/insertnewstudent', async function(req, res, next) {
  let newStudent = req.body;
  let result = await testmodel.saveStudent(newStudent);
  res.status(result.status).send(result.result);
});

module.exports = router;