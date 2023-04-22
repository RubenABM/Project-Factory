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


module.exports = router;