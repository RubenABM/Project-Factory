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

module.exports = router;