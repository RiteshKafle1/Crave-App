const mongoose = require("mongoose");

const connectDb = async (DB_URI) => {
  try {
   await  mongoose.connect(DB_URI);
    console.log("Database Connected :)");
  } catch (error) {
    console.log("Error in connecting db");
  }
};
module.exports=connectDb;
