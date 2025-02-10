// global module
const express = require("express");
const app = express();
require("dotenv").config();

// local module
const connectDb = require("./DB/db");
const foodRouter = require("./Routes/food.route");

// middlewares
app.use(express.json());
app.use("/api/food", foodRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    error: true,
    message: message,
  });
});

// server and db
const PORT = process.env.PORT || 3200;
const URI = process.env.URI;
app.listen(PORT, () => {
  connectDb(URI);
  console.log("Server Running :)");
});
