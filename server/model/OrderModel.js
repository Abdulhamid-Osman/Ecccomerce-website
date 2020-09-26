var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//schema number1 
const shippingSchema= new Schema({
address:{type:String,required:true},
city:{type:String,required:true},
country:{type:String,required:true}

});
 //paypal Schema
const paymentSchema =new Schema({

    paymentMethod:{type:String, required:true}
})
//Schema number 2
const orderItemSchema= new Schema({
    name:{type:String,required:true},
    qty:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:String,required:true},
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
});
//Entire Schema 
const orderSchema =new Schema({
    user:{type:mongoose.Schema.Types.ObjectId ,
        ref:'User',required:true},
        payment:paymentSchema,
        orderItems:[orderItemSchema],
        shipping:[shippingSchema],
        itemprice:{type:Number},
        shippingprice:{type:Number},
        totalPrice:{type:Number},
        isPaid:{type:Boolean,default:false},
        isPaidAt:{type:Date}
})

module.exports =mongoose.model("Order" ,orderSchema)


