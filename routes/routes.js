var express = require('express');
var router = express.Router();
var pool = require('../models/connection');
var routesmodel = require('../models/routesmodel');

//GET -> Obter todas as rotas existentes
router.get('/', async function (req, res, next) {
  console.log("Retrieving all routes");
  let result = await routesmodel.getRoutes();
  console.log(result);
  res.send(result);
});

//POST -> Inserir uma rota
router.post('/insertnewroute', async function(req, res, next) {
  let newRoute = req.body;
  let result = await routesmodel.saveRoutes(newRoute);
  res.status(result.status).send(result.result);
});

//GET -> Obter todas as rotas se um user
router.get('/user/:id', async function (req, res, next) {
  let id = req.params.id; 
  console.log("Retrieving user routes with id " + id);
  let result = await routesmodel.getUserRoutes(id);
  res.send(result);
});

//GET -> Obter todas as rotas se um user por nome
router.get('/user/:id/:name', async function (req, res, next) {
  let id = req.params.id;
  let name = req.params.name;

  console.log("Retrieving user routes with id " + id + " and name " + name);
  let result = await routesmodel.getUserRouteByName(id,name);
  res.send(result);
});

module.exports = router;