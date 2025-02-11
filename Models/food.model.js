const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  publicId:{
    type:String,
    default:"",
  },
  category: {
    type: String,
    required: true,
  },
});
const foodModel = mongoose.model.food || mongoose.model("Food", foodSchema);
module.exports = foodModel;
