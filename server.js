const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

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
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/login", (req, res) => {});

app.listen(3000);
