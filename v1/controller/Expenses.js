const Expenses = require("../models/Expenses/Expenses");
const moment = require("moment");
const format = "YYYY-MM-DD HH:mm:ss";

exports.createExpenses = async (req, res) => {
  let { type, amount, description } = req.body;
  let userId = req.user.id;

  let newExpense = new Expenses({ type, amount, description, userId });
  await newExpense.save();
  return res.status(200).send({ message: "Expense saved successfully" });
};

exports.getExpenses = async (req, res) => {
  let userId = req.user.id;
  let page = parseFloat(req.query.page) ? parseFloat(req.query.page) : 1;
  let PAGE_SIZE = 20;
  let skipPage = (page - 1) * PAGE_SIZE;

  let { type, minimumAmount, maximumAmount, fromDateAndTime, toDateAndTime } =
    req.query;

  let query = {};
  if (type) {
    query.type = type;
  }
  if (minimumAmount) {
    query.amount = { $gt: minimumAmount };
  }
  if (maximumAmount) {
    query.amount = { $lt: maximumAmount };
  }
  if (fromDateAndTime) {
    fromDateAndTime = new Date(fromDateAndTime);
    fromDateAndTime = moment(fromDateAndTime).format(format);
    fromDateAndTime = moment(fromDateAndTime).format(
      "YYYY-MM-DD[T00:00:00.000Z]"
    );
    query.createdAt = { $gte: fromDateAndTime };
  }
  if (toDateAndTime) {
    toDateAndTime = new Date(toDateAndTime);
    toDateAndTime = moment(toDateAndTime).format(format);
    toDateAndTime = moment(toDateAndTime).format("YYYY-MM-DD[T00:00:00.000Z]");
    query.createdAt = { $lte: toDateAndTime };
  }
  console.log(userId);
  let expenses = await Expenses.find(
    { userId, ...query },
    { type: 1, amount: 1, description: 1 }
  )
    .skip(skipPage)
    .limit(PAGE_SIZE);

  let expensesCount = await Expenses.find({}, { _id: 1 }).countDocuments();

  let pagination = {};
  if (expensesCount) {
    let totalPages = Math.ceil(expensesCount / PAGE_SIZE);
    // add totalPages attribute
    pagination.totalPages = totalPages;
    // add hasNextPage attribute
    pagination.hasNextPage = page < totalPages ? true : false;
    // add  hasPrevious Page attribute
    pagination.hasPreviousPage = page >= 2 ? true : false;
    let nextPage = page + 1 < totalPages ? page + 1 : null;
    pagination.nextPage = nextPage;
    pagination.currentPage = page;
  }
  return res.status(200).send({ expenses, pagination });
};

exports.getWeeklyExpenses = async (req, res) => {
  let { weekStartDate } = req.query;
  let userId = req.user.id;
  let startDate = moment(weekStartDate).format(format);
  startDate = moment(startDate).format("YYYY-MM-DD[T00:00:00.000Z]");

  let endDate = moment(startDate)
    .add("days", 7)
    .format("YYYY-MM-DD[T00:00:00.000Z]");

  let expenses = await Expenses.find({
    userId,
    createdAt: { $gte: startDate },
    createdAt: { $lte: endDate },
  });
  let total = 0;
  expenses.forEach((expense) => {
    total += expense.amount;
  });
  let averageSpending = total / 7;
  return res.status(200).send({ total, averageSpending, expenses });
};
