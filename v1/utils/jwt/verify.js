const jwt = require("jsonwebtoken");
const config = require("config");

const authenticate = async (req, res) => {
  const token = await req.headers["Authorization"];

  try {
    if (!token) {
      return res.status(400).json({ error: "No token provided in headers" });
    }
    const decoded = await jwt.verify(token, config.get("appSecretKey"));
    if (decoded) return decoded;
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

module.exports = authenticate;
