const express = require("express");
const router = express.Router();

const Health = require("../controller/Health");
router.get("/", Health.checkHealth);

module.exports = router;
