// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;

const StudentSchema = new Schema({
  name: String,
  studyDay: Array,
  budget: Number,
  balance: {
    type: Number,
    default: 0,
  },
  payments: {
    type: Array,
    default: [],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Student", StudentSchema);
