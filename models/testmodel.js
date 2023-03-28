const { response } = require("express");
var pool = require('./connection');
var { mssql, poolPromise } = require('./connection');

//Obter estudantes
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

//Inserir um estudante
module.exports.saveStudent = async function(stu) {
    try {

        let sql =
            "INSERT " +
            "INTO student " +
            "(stu_name, stu_phone) " +
            "VALUES ($1, $2) ";

        let result = await pool.query(sql, [stu.stu_name, stu.stu_phone]);
        
        return { status: 200, result: result };
    } catch (err) {

        console.log(err);
        return { status: 500, result: err };
    }
}