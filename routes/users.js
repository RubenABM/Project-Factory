var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var usermodel = require('../models/usersmodel');

//GET -> Obter todos os users
router.get('/', async function (req, res, next) {
  console.log("Retrieving all users");
  let result = await usermodel.getUsers();
  console.log(result);
  res.send(result);
});

//POST -> Inserir um novo user
router.post('/insertnewuser', async function(req, res, next) {
  let newUser = req.body;
  let result = await usermodel.saveUser(newUser);
  res.status(result.status).send(result.result);
});

//POST -> Login
router.post('/login', async function(req, res, next){
  
  let user = req.body;
  console.log("Email = " + JSON.stringify(user));

  let result = await usersModel.authUser(user);
  res.status(result.status).send(result.result);


});

module.exports = router;