const sql = require("mssql");
const ordonezConfig = require("./config.js");
const config = {
  user: ordonezConfig.DB.user,
  password: ordonezConfig.DB.password,
  server: ordonezConfig.DB.server,
  database: ordonezConfig.DB.database,
};

async function executeQuery(aQuery) {
  let connection = await sql.connect(config);
  let result = await connection.query(aQuery);

  //console.log(result);
  return result.recordset;
}

// executeQuery(
//   `SELECT * FROM Movie LEFT JOIN Genre ON genre.GenrePK = movie.GenreFK`
// );

module.exports = { executeQuery: executeQuery };
