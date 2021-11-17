const express = require("express");
const router = express.Router();

const Users = require("../controller/Auth");

router.post("/signup", Users.signup);
router.post("/login", Users.login);

module.exports = router;
