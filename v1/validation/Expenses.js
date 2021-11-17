const Joi = require("@hapi/joi");

const Expenses = require("../controller/Expenses");

exports.createExpenses = async (req, res) => {
  let data = req.body;
  const schema = Joi.object({
    type: Joi.string()
      .valid("fuel", "food", "grocery", "travel", "other")
      .required(),
    description: Joi.string().required(),
    amount: Joi.number().greater(0).required(),
  });
  const { error } = await schema.validate(data);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    Expenses.createExpenses(req, res);
  }
};

exports.getExpenses = async (req, res) => {
  let data = req.query;
  const schema = Joi.object({
    type: Joi.string().valid("fuel", "food", "grocery", "travel", "other"),
    page: Joi.number(),
    minimumAmount: Joi.number(),
    maximumAmount: Joi.number(),
    fromDateAndTime: Joi.string(),
    toDateAndTime: Joi.string(),
  });
  const { error } = await schema.validate(data);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    Expenses.getExpenses(req, res);
  }
};

exports.getWeeklyExpenses = async (req, res) => {
  let data = req.query;
  const schema = Joi.object({
    weekStartDate: Joi.string(),
  });
  const { error } = await schema.validate(data);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    Expenses.getWeeklyExpenses(req, res);
  }
};
