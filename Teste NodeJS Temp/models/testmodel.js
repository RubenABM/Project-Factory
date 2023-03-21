const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');


module.exports.getStudents = async function () {


    try {
        const sql = " select * from student ";
        

        const result = await pool.query(sql);
        return result.rows;
    } catch (err) {
        console.log(err);
        return { status: 500, data: err };
    }
}