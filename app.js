const express = require("express");
const app = express();

const db = require("./models/index");

const { Member } = db;

app.use(express.json());

app.get("/api/members", async (req, res) => {
  const { team } = req.query;
  if (team) {
    const teamMembers = await Member.findAll({ where: { team } });
    res.send(teamMembers);
  } else {
    const members = await Member.findAll();
    res.send(members);
  }
});

app.get("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.post("/api/members", async (req, res) => {
  const newInfo = req.body;
  const member = Member.build(newInfo); //build는 하나의 멤버 모델 객체를 생성하고 리턴, 이 모델 객체는 테이블에서 하나의 row가 될 존재
  await member.save(); //실제로 테이블에 row로 추가
  res.send(member);
});

app.put("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;
  const member = await Member.findOne({ where: { id } });
  if (member) {
    Object.keys(newInfo).forEach((prop) => {
      member[prop] = newInfo[prop];
    });
    await member.save();
    res.send(member);
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.delete("/api/members/:id", async (req, res) => {
  const { id } = req.params;
  const deletedCount = await Member.destroy({ where: { id } });
  if (deletedCount) {
    res.send({ message: `${deletedCount} row(s) deleted` });
  } else {
    res.status(404).send({ message: "There is no member with the id!" });
  }
});

app.listen(process.env.PORT || 1000, () => {
  console.log("server is listening...");
});
