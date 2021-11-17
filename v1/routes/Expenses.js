const express = require("express");
const router = express.Router();

const Expenses = require("../validation/Expenses");
const authMiddleware = require("../utils/Auth/Auth");

router.post("/", authMiddleware, Expenses.createExpenses);
router.get("/", authMiddleware, Expenses.getExpenses);
router.get("/weekly", authMiddleware, Expenses.getWeeklyExpenses);

module.exports = router;
