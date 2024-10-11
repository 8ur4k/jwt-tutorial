require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());

const users = [];

const posts = [
  {
    username: "Kyle",
    title: "Post 1",
  },
  {
    username: "Jim",
    title: "Post 2",
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/posts", (req, res) => {
  res.json(posts);
});

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { username: req.body.username, password: hashedPassword };
    users.push(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/login", async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);
  if (user == null) {
    return res.status(400).send("Cannot find user");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      const username = req.body.username;
      const user = { username: username };

      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

      res.json({ accessToken: accessToken });
    } else {
      res.send("Wrong password");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000);
