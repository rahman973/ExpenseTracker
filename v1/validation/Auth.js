const Joi = require("@hapi/joi");

const Auth = require("../controller/Auth");

exports.signUp = async (req, res) => {
  let data = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).required(),
  });
  const { error } = await schema.validate(data);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    Auth.signup(req, res);
  }
};

exports.login = async (req, res) => {
  let data = req.body;
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(64).required(),
  });
  const { error } = await schema.validate(data);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
  } else {
    Auth.login(req, res);
  }
};
