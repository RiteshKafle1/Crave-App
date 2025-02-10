// global module
const express = require("express");
const app = express();
require("dotenv").config();

// local module
const connectDb = require("./DB/db");

// middlewares
app.use(express.json())

// server and db
const PORT = process.env.PORT || 3200;
const URI = process.env.URI;
app.listen(PORT, () => {
  connectDb(URI);
  console.log("Server Running :)");
});
