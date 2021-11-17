const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return res.status(400).json({ error: "No token provided!" });

  try {
    const decode = jwt.verify(token, config.get("appSecretKey"));

    req.user = decode;

    next();
  } catch (error) {
    return res.status(400).json({ error: [{ msg: "Invalid token" }] });
  }
};

module.exports = authMiddleware;
