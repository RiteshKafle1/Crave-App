const Joi = require("joi");
const foodModel = require("../Models/food.model");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const foodSchema = Joi.object({
  name: Joi.string()
    .required()
    .max(30)
    .pattern(new RegExp("^[\\w\\s]+$"))
    .trim(),
  description: Joi.string()
    .required()
    .max(50)
    .pattern(new RegExp("^[\\w\\s]+$"))
    .trim(),
  category: Joi.string()
    .required()
    .max(20)
    .pattern(new RegExp("^[\\w\\s]+$"))
    .trim(),
  price: Joi.number().required().min(0),
});

const addFood = async (req, res, next) => {
  const { error } = foodSchema.validate(req.body);
  if (error) {
    return next({ statusCode: 404, message: error.message });
  }
  try {
    const { name, description, price, category } = req.body;
    // console.log(typeof(name,price));
    const foodImage = req.file;
    if (!foodImage) {
      return next({ statusCode: 400, message: "No Image Found" });
    }
    let cloud = await cloudinary.uploader.upload(foodImage.path, {
      folder: "Food-image",
    });
    const newFoodItem = new foodModel({
      name,
      description,
      price: Number(price),
      image: cloud.secure_url,
      category,
    });
    await newFoodItem.save();
    return res.status(201).json({ error: false, message: "Item Added" });
  } catch (error) {
    console.log("Error in creating foodItems");
    next(error);
  }
};
const listFood = async (req, res, next) => {
  try {
    const foodItem = await foodModel.find({}).sort({ name: 1 });
    if (foodItem.length === 0) {
      return next({ statusCode: 500, message: "No Item Found" });
    }
    return res.status(200).json({ error: false, foodItem });
  } catch (error) {
    console.log("Error in listing food");
    next(error);
  }
};
const removeFood = async (req, res, next) => {
  try {
    const deleteItem = await foodModel.findById(req.body.id);
    if (!deleteItem) {
      return next({ statusCode: 400, message: " OOPS :) Couldnot find Item" });
    }
    return res.status(200).json({ error: false, message: "item deleted" });
  } catch (error) {
    console.log("Error in removing food");
    next(error);
  }
};
module.exports = { addFood, listFood, removeFood };
