const express=require('express')
const foodRouter=express.Router()

const {addFood,listFood,removeFood,updateFood}=require('../Controllers/food.controller')

const upload=require('../middlewares/multer')

foodRouter.post('/',upload.single('foodImage'),addFood);
foodRouter.get('/',listFood);
foodRouter.delete('/',removeFood);
foodRouter.put('/:id',upload.single('foodImage'),updateFood)

module.exports=foodRouter;