const express = require("express");
const router = express.Router();

const Users = require("../validation/Auth");

router.post("/signup", Users.signUp);
router.post("/login", Users.login);

module.exports = router;
