const mongoose = require("mongoose");
const ExpensesSchema = require("./ExpensesSchema");

const Expenses = mongoose.model("Expenses", ExpensesSchema);

module.exports = Expenses;
