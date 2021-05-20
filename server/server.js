const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static("server/public"));

//#region -- GET & POST Routes go here
const guesses = require("./modules/guesses");
app.get("/guesses", (req, res) => {
  console.log("got to /guesses");

  // respond
  res.send(guesses);
});

app.post("/guesses", (req, res) => {
  // We want to add the incoming data to /guesses
  // req.body is made by body-parser
  // info from client
  console.log(req.body);
  guesses.push(req.body);
  // send back a good response
  res.sendStatus(201);
});
//#endregion

// THIS IS WHERE THE VOID LIVES

//#region -- ARE YOU LISTENING?
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

//#endregion

// test
