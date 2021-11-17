const bcrypt = require("bcryptjs");

const passwordChecker = async (password, hash) => {
  const match = await bcrypt.compare(password, hash);
  return match;
};

module.exports = passwordChecker;
