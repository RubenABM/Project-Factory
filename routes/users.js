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

//GET -> Obter um user pelo ID
router.get('/:id', async function(req, res, next){

  let id = req.params.id; 
  console.log("Retrieving user with id " + id);
  let result = await usermodel.getUserById(id);
  res.status(result.status).send(result.data);

});

//GET -> Obter capacetes de um user pelo ID
router.get('/helmets/:id', async function(req, res, next){

  let id = req.params.id; 
  console.log("Retrieving user helmets with id " + id);
  let result = await usermodel.getUserHelmets(id);
  res.status(result.status).send(result.data);

});

//GET -> Obter dados de um user numa rota pelos IDS
router.get('/data/:id1/:id2', async function(req, res, next){

  let id1 = req.params.id1;
  let id2 = req.params.id2;  

  console.log("Retrieving user data with id " + id1 + " and route id " + id2);
  let result = await usermodel.getUserRouteData(id1,id2);
  res.status(result.status).send(result.data);

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

  let result = await usermodel.authUser(user);
  res.status(result.status).send(result.result);


});

router.get('/login2/:email/:password', async function (req, res, next){

  let email = req.params.email;
  let password = req.params.password;
  
  let result = await usermodel.authUser2(email, password);
  res.status(result.status).send(result.data);

});

//POST -> Inserir dados de um user numa rota
router.post('/insertnewdata', async function(req, res, next){
  
  let data = req.body;
  console.log("Data = " + JSON.stringify(data));

  let result = await usermodel.saveUserRouteData(data);
  res.status(result.status).send(result.result);

});

module.exports = router;