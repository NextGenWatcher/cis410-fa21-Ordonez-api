const sql = require("mssql");
const config = {
  user: "csu",
  password: "Uuxwp7Mcxo7Khy",
  server: "cobazsqlcis410.database.windows.net", // You can use 'localhost\\instance' to connect to named instance
  database: "yessy",
};

async function executeQuery(aQuery) {
  let connection = await sql.connect(config);
  letResults = await connection.query(aQuery);

  console.log(aQuery);
}
