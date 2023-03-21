var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var studentsmodel = require('../models/testmodel');

router.get('/', async function (req, res, next) {
  console.log("Retrieving all students");
  let result = await studentsmodel.getStudents();
  console.log(result);
  res.send(result);
});

module.exports = router;