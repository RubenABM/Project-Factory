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
        const sql = " insert into route (route_name, route_coord, route_fav, route_user_id) values ($1, $2, false, $3); ";
        
        let result = await pool.query(sql, [route.route_name, route.route_coord, route.route_user_id]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

//Obter todas as rotas de um user
module.exports.getUserRoutes = async function (user_id) {


    try {
        const sql = " select * from route " +
        "inner join users on route_user_id = user_id " +
        "where user_id =  " + user_id;
        
        console.log("SQL: " + sql)
        let result = await pool.query(sql);
        let routes = result.rows;
        console.log("Routes = " + JSON.stringify(routes));

        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}