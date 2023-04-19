var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var helmetsmodel = require('../models/helmetsmodel');

//GET -> Obter todos os capacetes
router.get('/', async function (req, res, next) {
  console.log("Retrieving all helmets");
  let result = await helmetsmodel.getHelmets();
  console.log(result);
  res.send(result);
});

module.exports = router;