const mongoose = require("mongoose");
const UserSchema = require("./UserSchema");

const User = mongoose.model("user", UserSchema);

module.exports = User;
