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
    return next({ statusCode: 404, message: "" });
  }
  try {
    const { name, description, price, category } = req.body;
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
      price,
      image: cloud.secure_url,
      category,
    });
    await newFoodItem.save();
    return res.status(200).json({error:false,message:'Item Added'});
  } catch (error) {
    console.log("Error in creating foodItems");
    next(error);
  }
};
module.exports = { addFood };
