const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
   product_name : String,
   product_price:Number,
   product_description:String,
   availability:Boolean,
   categoryID:{type:String,required:true}
   
},
{
    versionKey:false,
}
)
const ProductModel = mongoose.model('product',productSchema)
module.exports = {ProductModel}