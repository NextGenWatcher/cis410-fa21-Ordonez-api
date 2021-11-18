const express = require("express");

const db = require("./bdConnectExec.js");
const app = express();

// 1 is the port we will be using
// 2 is the funciton that we want to run once the app is running on that port

app.listen(5000, () => {
  console.log("app is running on port 5000");
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

//app.post()
//app.put()

app.get("/movies", (req, res) => {
  //get data from the database
});
