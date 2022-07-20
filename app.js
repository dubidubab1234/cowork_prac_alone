const express = require("express");

const members = [{ id: 10, name: "sally" }];

const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send(members);
});

app.post("/hello", (req, res) => {
  const newMember = req.body;
  members.push(newMember);
  res.send(newMember);
});

app.listen(1000, () => {
  console.log("server is listening...");
});
