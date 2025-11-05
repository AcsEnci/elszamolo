require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const StudentModel = require("./db/student.model");

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(express.static("dist"));

const path = require("path");
const fs = require("fs");

app.get("/api/days", (req, res) => {
  const filePath = path.join(__dirname, "populate", "days.json");
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Could not load days." });
  }
});

app.get("/api/students", async (req, res) => {
  const {day, name} = req.query;
  const filter = {};
  try {

    if (day) {
      filter.studyDay = day;
    }
    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }
    const students = await StudentModel.find(filter).sort({ balance: "asc" });
    return res.json(students);
  } catch (err) {
    next(err);
  }
});

app.get("/api/students/:id", async (req, res) => {
  const student = await StudentModel.findById(req.params.id);
  return res.json(student);
});

app.post("/api/students/", async (req, res, next) => {
  const student = req.body;

  try {
    const saved = await StudentModel.create(student);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/students/:id", async (req, res, next) => {
  try {
    const student = await StudentModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(student);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    const deleted = await student.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
    console.log("Try /api/students route right now");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
