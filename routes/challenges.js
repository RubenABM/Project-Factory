var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var challengesmodel = require('../models/challengesmodel');

//GET -> Obter todos os challenges
router.get('/', async function (req, res, next) {
  console.log("Retrieving all challenges");
  let result = await challengesmodel.getChallenges();
  console.log(result);
  res.send(result);
});

module.exports = router;