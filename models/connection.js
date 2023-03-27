var pg = require('pg');

//const connectionString = "";

//Exemplo -> Retirar depois:
const connectionString = "postgres://postgres:20200453@localhost:5432/testdb";
//const connectionString = "postgres://" + process.env.DBUSER + ":" + process.env.DBPASS + "@localhost:5432/Products";

console.log("connectionString = " + connectionString);

const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10
    // For Heroku
    /*       ,
    ssl: {
        require: true,
        rejectUnauthorized: false
    */
}).on('connect', (stream) => {
    console.log('Connected to PG.');
});

module.exports = pool;