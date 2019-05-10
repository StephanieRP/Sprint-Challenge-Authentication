const axios = require("axios");
const bcrypt = require("bcryptjs");
const { authenticate } = require("../auth/authenticate.js");
const token = require("../auth/token.js");
const db = require("../database/helpers/users-model");

module.exports = server => {
  server.post("/api/register", register);
  server.post("/api/login", login);
  server.get("/api/jokes", authenticate, getJokes);
};

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 13);
  user.password = hash;

  db.add(user)
    .then(newUser => {
      res.status(201).json(newUser);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Sorry could not create your account.", error });
    });
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const myToken = token.generateToken(user);
        res.status(200).json({
          message: `You have successfully logged in ${user.username}!`,
          myToken
        });
      } else {
        res.status(401).json({ message: "Invalid Login Credentials" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "Sorry could not log you into your account." });
      console.log(error);
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: "application/json" }
  };

  axios
    .get("https://icanhazdadjoke.com/search", requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: "Error Fetching Jokes", error: err });
    });
}
