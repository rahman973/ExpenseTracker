const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const dbConnect = require("./config/db");

const app = express();
dbConnect();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", require("./v1/routes"));

const _port = process.env.PORT || 3001;

app.listen(_port, () => {
  console.log(`App is listening at ${_port}`);
});
