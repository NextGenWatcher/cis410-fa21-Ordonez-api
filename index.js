const express = require("express");
const bcrypt = require("bcryptjs");

const db = require("./dbConnectExec.js");

const app = express();

app.use(express.json());
// 1 is the port we will be using
// 2 is the funciton that we want to run once the app is running on that port

app.listen(5000, () => {
  console.log(`app is running on port 5000`);
});

// first argument = the route path/ end point
// second argumne is a funciton, request/response
app.get("/hi", (req, res) => {
  res.send("hello world");
});

//route for a home
app.get("/", (req, res) => {
  res.send("API is running");
});
//
//
//
//Post Commands
app.post("/wallets", async (req, res) => {
  // res.send("/wallets called");
  //console.log("request body", req.body);

  let nameFirst = req.body.nameFirst;
  let nameLast = req.body.nameLast;
  let address = req.body.address;
  let password = req.body.password;

  if (!nameFirst || !nameLast || !address || !password) {
    return res.status(400).send("Bad request");
  }
  //replace argument has two part 1, what we want to replace, 2. what we want to replace it with
  nameFirst = nameFirst.replace("'", "''");
  nameLast = nameLast.replace("'", "''");

  let emailCheckQuery = `SELECT Address
  FROM Wallet
  WHERE Address = '${address}'`;

  let existingUser = await db.executeQuery(emailCheckQuery);

  //console.log("existing user", existingUser);

  if (existingUser[0]) {
    return res.status(409).send("Address is already linked to an account");
  }

  let hashedPassword = bcrypt.hashSync(password);
  let insertQuery = `INSERT INTO Wallet(NameFirst,NameLast, Address, Password)
  VALUES('${nameFirst}', '${nameLast}', '${address}', '${hashedPassword}')`;

  db.executeQuery(insertQuery)
    .then(() => {
      res.status(201).send();
    })
    .catch((err) => {
      console.log("error in POST /Wallet", err);
      res.status(500).send();
    });
});
//
//
//
//
//get commands
app.get("/nfts", (req, res) => {
  //get data from the database
  db.executeQuery(
    `SELECT *
    FROM NFT
    LEFT JOIN Genre
    ON genre.GenrePK = NFT.GenreFK`
  )
    .then((theResults) => {
      res.status(200).send(theResults);
    })
    .catch((myError) => {
      console.log(myError);
      res.status(500).send();
    });
});

app.get("/nfts/:pk", (req, res) => {
  let pk = req.params.pk;
  //console.log(pk);
  let myQuery = `SELECT *
  FROM NFT
  LEFT JOIN Genre
  ON genre.GenrePK = NFT.GenreFK
  WHERE NFTPK = ${pk}`;
  db.executeQuery(myQuery)
    .then((result) => {
      // console.log("result", result);
      if (result[0]) {
        res.send(result[0]);
      } else {
        res.status(404).send(`bad request`);
      }
    })
    .catch((err) => {
      console.log("Error in /movies/:pk", err);
      res.status(500).send();
    });
});
