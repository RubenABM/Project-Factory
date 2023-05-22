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

//POST -> Inserir um challenge
router.post('/insertchallenge', async function (req, res, next) {
  
  let challenge = req.body;
  console.log("Challenge = " + JSON.stringify(challenge));

  let result = await challengesmodel.saveChallenge(challenge);
  console.log("Result = " + result);

  //res.status(result.status).send(result.result);
  res.send(result.result);
});

module.exports = router;