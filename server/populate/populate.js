/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const days = require("./days.json");
const prices = require("./prices.json");
const StudentModel = require("../db/student.model");

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await StudentModel.deleteMany({});

  const students = names.map((name) => ({
    name,
    budget: pick(prices),
    studyDay: [pick(days)],
  }));

  await StudentModel.create(...students);
  console.log("Students created");
};

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
