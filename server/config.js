var dotenv =require('dotenv');
dotenv.config()

 var config ={}; 

 config.JWT_SECRETE="" + process.env.JWT_SECRETE
    
   config.PAYPAL_CLIENT_ID= "" +process.env.PAYPAL_CLIENT_ID,
    
 module.exports=config;