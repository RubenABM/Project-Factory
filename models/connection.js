var pg = require('pg');

//const connectionString = "";

//Formato da connection string -> 
//const connectionString = "postgres://" + process.env.DBUSER + ":" + process.env.DBPASS + "@localhost:5432/Products";

//Connection strings locais:
// (Rúben) const connectionString = "postgres://postgres:20200453@localhost:5432/testdb";


//Connection string AWS:
//const connectionString = "postgres://postgres:12345678@smarthelmetdb.c4eu33pgml2z.eu-west-2.rds.amazonaws.com:5432/postgres";

const connectionString = "postgres://postgres:postgres@smarthelmet.cyxzsgn31s0w.eu-west-2.rds.amazonaws.com:5432/postgres";


console.log("connectionString = " + connectionString);

const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    ssl:{
        require: true,
        rejectUnauthorized: false
}}).on('connect', (stream) => {
    console.log('Connected to PG.');
});

module.exports = pool;