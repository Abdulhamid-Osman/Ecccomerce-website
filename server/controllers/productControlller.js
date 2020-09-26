var express =require('express')
const router =express.Router()
const Product =require('../model/productModel');

router.get('/', async (req,res)=>{
    try{
const category =req.query.category? {category:req.query.category}:{}
const Products = await Product.find({...category})
res.send(Products)
    }
    catch(e){
        console.log(e.message)
        res.status(500).send("category of good not found")

    }


})
router.get('/:id', async(req,res)=>{
    try{

    const product =await Product.findOne({_id:req.params.id  })
    if(product){
 
        res.send(product)
    }
    else{
        res.status(404).send({mesage:"product not found"})
    }
}catch(e){
    console.log(e.message)
        res.status(500).send("product with such id is not found")

}
})

router.put('/:id', async(req,res)=>{
    try{
const productId= req.params.id
    const product =await Product.findById(productId)
    if(product){
        product.name=req.body.name,
        product.price =req.body.price,
        product.image =req.body.image,
        product.category=req.body.category,
        product.description=req.body.description
      
        
        const updatedproduct =await Product.save()
        if(updatedproduct){
            return res.status(200).send({mesage:"succesfully updated"})
        }
        else{
            return res.status(404).send({mesage:"product not found"})
        }
    }
}catch(e){
    console.log(e.message)
        res.status(500).send("Error in updating the [roduct")


}

})
router.delete('/:id', async(req,res)=>{
try{
    const deleteproduct=await Product.findById(req.params.id)
    if(deleteproduct){
        await deleteproduct.remove()
        res.send({mesage:"Product Deleted"})
    }
    else{

        res.send('Error in Deletetion')
    }
}catch(e){

    console.log(e.message)
        res.status(500).send("Eror in deleting the product")

}
})
router.post('/',async(req,res)=>{
    try{
    const product =new Product({
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        category:req.body.category,
        description:req.body.description
    })
    const newproduct=await product.save()
    if(newproduct){
        return res.status(201).send({mesage:"New product created",data:newproduct})

    }
    return res.status(500).send({mesage:'Error in creatig product'})
}catch(e){
    console.log(e.message)
    res.status(500).send("product not found")


}
})
module.exports =router;