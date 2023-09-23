const mongoose = require('mongoose')
const orderSchema = mongoose.Schema({
    userID:String,
    product:[
        {
            product_name : String,
            product_price:Number,
            product_description:String,
            quantity:{
                type:Number,
                min:1
            },

         
        }
    ],
    total_amount:Number,
    orderDate:{
        type: Date,
        default: Date.now,
    
    }

},
)
const OrderModel = mongoose.model('order',orderSchema)
module.exports = {OrderModel}