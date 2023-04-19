const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');

//Obter todos os users
module.exports.getUsers = async function () {


    try {
        const sql = " select * from users ";
        

        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//GET -> Obter um user pelo ID
module.exports.getUserById = async function(user_id) {
    try {
        let sql = "select * from users where user_id = " + user_id;
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("User = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//Inserir um user
module.exports.saveUser = async function(user) {
    try {

        let sql =
            "INSERT " +
            "INTO users " +
            "(user_name, user_email, user_password, user_points, user_subscription) " +
            "VALUES ($1, $2, $3, 0, 'Free')";

        let result = await pool.query(sql, [user.user_name, user.user_email, user.user_password]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}

module.exports.authUser = async function(user){

    try {

        let sql = "SELECT * FROM users where user_email = $1";

        let result = await pool.query(sql,[user.user_email]);

        let passwordb = result.rows[0].user_password;

        let valor = (user.user_password == passwordb);

        if(result.rows.length > 0 && valor)
          return { status: 200, result: result.rows[0]};
        else return { status: 401, result: {msg:'Email ou password errados!'}};
        
    } catch (err) {
        console.log(err);
        return { status: 500, result: {msg: 'Email ou password errados!'}};
    }
}

module.exports.authUser2 = async function(email, password){

    try {

        let sql = "SELECT * FROM users where user_email = " + "'" + email + "'" + " AND user_password = " + "'" + password + "'";

        let result = await pool.query(sql);
        
        return { status: 200, data: result.rows };

    } catch (err) {

        console.log(err);
        return { status: 500, result: {msg: 'Email ou password errados!'}};
    }
}

//GET -> Obter um user pelo ID
module.exports.getUserHelmets = async function(user_id) {
    try {
        let sql = " select * from users " +
        "inner join helmet on helmet_user_id = user_id " +
        "where user_id = " + user_id;
        
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("User = " + JSON.stringify(users));
        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

module.exports.getUserRouteData = async function(user_id, route_id) {
    try {
        let sql = " select * from users " +
        "inner join data on data_user_id = user_id " +
        "inner join route on data_route_id = route_id " +
        "where user_id = " + user_id + " and route_id = " + route_id;
        
        let result = await pool.query(sql);
        let users = result.rows;
        console.log("User = " + JSON.stringify(users));

        return { status: 200, data: users };
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

    
