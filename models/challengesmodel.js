const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');

//Obter todos os users
module.exports.getChallenges = async function () {


    try {
        const sql = " select * from challenge ";
        
        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}

//Inserir um challenge
module.exports.saveChallenge = async function (challenge) {


    try {
        const sql =
        "INSERT " +
        "INTO challenge " +
        "(chall_coord, chall_points, chall_award, chall_totalKM, chall_provider) " +
        "VALUES ($1, $2, $3, $4, $5)";

        let result = await pool.query(sql, [challenge.chall_coord, challenge.chall_points, challenge.chall_award, challenge.chall_totalKM, challenge.chall_provider]);
        
        //console.log("RESULT: " + result.rows)

        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}