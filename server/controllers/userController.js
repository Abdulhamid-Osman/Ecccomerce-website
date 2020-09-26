
var express =require('express');
const {getToken} =require('../util');
const router =express.Router();
 const User =require('../model/userModel')
 const bcrypt =require('bcrypt')
router.put('/:id',getToken,async(req,res)=>{

    try{
    const userId=req.params.id;
    const user = await  User.findById(userId);
    if(user){

        user.name=req.body.name|| user.name;
        user.email=req.body.email||user.email,
        user.password =req.body.password||user.password
        const  updatedUser= user.save()
        res.send({
            _id:updatedUser.id,
            name:updatedUser.name,
            email:updatedUser.email,
            token:getToken(updatedUser)
        })
      
    }
    else{
        res.status(404).send({message:"User Not found"})
    }
}
catch(e){
    console.log(e.message)
        res.status(500).send("userId was not found")

}
})
router.post('/signin',async(req,res)=>{
    try{
    const signinUser= await User.findOne({email:req.body.email})
    if(signinUser){
        if(bcrypt.compareSync(req.body.password, signinUser.password)){
            res.send({
                _id:signinUser.id,
                email:signinUser.email,
                token:getToken(signinUser)
            })
        }
        else{
            res.json({error:"User does not exist"}) 
        }

       
    }
    else{

        res.status(401).send({message:"Invalid Email .please register first!"})
    }
}catch(e){
    console.log(e.message)
        res.status(500).send("Server failed")
}
})
router.post('/register',async(req,res)=>{
try{
    const hashedpassword =bcrypt.hashSync(req.body.password,8)
    const user= await new User({
       _id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        password:hashedpassword
    })
    const newUser = await user.save()
    if(newUser){
        res.send({
            name:newUser.name,
            email:newUser.email,
            token:getToken(newUser)

        })

    }
    else{
        res.status(401).send({message:"Invalid user Data"})
    }
}catch(e){
    console.log(e.message)
        res.status(500).send("server error")
}
})
module.exports=router
