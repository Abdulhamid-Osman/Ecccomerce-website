var mongoose =require('mongoose');
var Schema = mongoose.Schema;
const userSchema= Schema({

    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,isAdmin:{type:Boolean,required:true},default:false},

    
})

module.exports =mongoose.model("User",userSchema)