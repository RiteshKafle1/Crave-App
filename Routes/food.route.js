const express=require('express')
const foodRouter=express.Router()

const {addFood}=require('../Controllers/food.controller')

const upload=require('../middlewares/multer')

foodRouter.post('/',upload.single('foodImage'),addFood);

module.exports=foodRouter;