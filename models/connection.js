var pg = require('pg');

const connectionString = "";

//Exemplo -> Retirar depois:
//const connectionString = "postgres://postgres:password@localhost:5432/Products";
//const connectionString = "postgres://" + process.env.DBUSER + ":" + process.env.DBPASS + "@localhost:5432/Products";

console.log("connectionString = " + connectionString);


const Pool = pg.Pool
const pool = new Pool({
 connectionString,
 max: 10,
 ssl: {
  require: true,
  rejectUnauthorized: false
  }
})

pool.connect(function(err) {
  if (err) throw err;
  console.log('Database is connected successfully !');
});

module.exports = pool;