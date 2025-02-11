const express=require('express')
const foodRouter=express.Router()

const {addFood,listFood,removeFood}=require('../Controllers/food.controller')

const upload=require('../middlewares/multer')

foodRouter.post('/',upload.single('foodImage'),addFood);
foodRouter.get('/',listFood);
foodRouter.delete('/',removeFood);

module.exports=foodRouter;