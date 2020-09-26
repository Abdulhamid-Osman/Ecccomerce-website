var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const productSchema= new Schema({

    name:{type:String,required:true},
    image:{type:String, required:true},
    price:{type:String,required:true},
    description:{type:String,required:true},
    category:{type:String,required:true},
    
});

module.exports =mongoose.model("Product" ,productSchema)