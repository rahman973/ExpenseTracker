const mongoose = require("mongoose");

const ExpensesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  type: {
    type: String,
    enum: ["fuel", "food", "grocery", "travel", "other"],
  },
  amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ExpensesSchema;
