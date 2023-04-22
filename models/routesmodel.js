const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');

//Obter todas as rotas existentes
module.exports.getRoutes = async function () {


    try {
        const sql = " select * from route ";
        
        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//Inserir uma nova rota
module.exports.saveRoutes = async function (route) {

    try {
        const sql = " insert into route (route_coord, route_fav) values ($1, false); ";
        
        let result = await pool.query(sql, [route.route_coord]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}