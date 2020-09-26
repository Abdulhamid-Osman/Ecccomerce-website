var express =require('express')
const multer= require('multer')
const router= express.Router()
const path =require('path')
 
 var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
  var upload = multer({ storage: storage }).single('images')
  router.post('/',(req,res)=>{
    upload(req,res,function(err){
      if(err instanceof multer.MulterError){
        return res.status(500).json(err)
      } 
      else if(err){
        return res.status(500).json(err)
      }
      return res.status(200).send(req.path.file)
    })

    
  })
 



module.exports=router;