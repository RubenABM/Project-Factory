const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');

//Obter estudantes
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

//Inserir um estudante
module.exports.saveUser = async function(user) {
    try {

        let sql =
            "INSERT " +
            "INTO users " +
            "(user_name, user_email, user_password, user_points) " +
            "VALUES ($1, $2, $3, 0) ";

        let result = await pool.query(sql, [user.user_name, user.user_email, user.user_password]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}