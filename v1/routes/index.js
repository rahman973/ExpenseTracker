var express = require("express");
var router = express.Router();

router.use("/auth", require("./Auth"));
router.use("/expenses", require("./Expenses"));
module.exports = router;
