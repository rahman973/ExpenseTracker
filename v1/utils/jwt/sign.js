const jwt = require("jsonwebtoken");
const config = require("config");

const sign = async ({ _id }) => {
  const user = {
    id: _id
  };

  const token = jwt.sign(user, config.get("appSecretKey"), {
    expiresIn: 36000
  });

  return token;
};

module.exports = sign;
