const express =require('express');
const router= express.Router();
var Order= require('../model/OrderModel')

router.get("/", async(req,res)=>{
    try{
    const Orders= await Order.find({}).populate('User')
    res.send(Orders)
    } catch(e){
        console.log(e.message)
        res.status(500).send("order  not found")

    }
});

router.get('/mine',async(req,res)=>{
    try{
const Orders =await Order.find({user:req.user.id});
res.send(Orders);
    }catch(e){
        console.log(e.message)
        res.status(500).send("order of such user id is not found")

    }

})
router.get("/:id",async(req,res)=>{
    try{
    const order = await Order.findOne({_id:req.params.id})
    if(order){

        res.send(order)
    }else{
        res.status(404).send("Order Not Found")
    }
}catch(e){

    console.log(e.message)
    res.status(500).send("order with such id is not found")

}
});
router.delete("/:id",async(req,res)=>{
    try{
    const order=await Order.findOne({_id:req.params.id})
    if(order){
        const deletedOrder= await Order.remove()
        res.send(deletedOrder)
    }
    else{
        res.status(404).send("Order not found")
    }
}catch(e){
    console.log(e.message)
    res.status(500).send("order not deleted")

}
})

router.post('/',async(req,res)=>{
    try{
const newOrder= new Order({
    orderItems:req.body.orderItems,
    user:req.body._id,
    shipping:req.body.shipping,
    payment:req.body.payment,
    itemprice:req.body.itemprice,
    taxprice:req.body.taxprice,
    shippingPrice:req.body.shippingPrice,
    totalPrice:req.body.totalPrice
})

const newOrderCreated= await newOrder.save()
res.status(201).send({message:"New Order created",data:newOrderCreated})
    } catch(e){
        console.log(e.message)
        res.status(500).send("New order not created")

    }
})
router.put("/:id/pay",async(req,res)=>{
    try{
const order=await Order.findById(req.params.id)
if(order){
order.isPaid=true,
order.isPaidAt =Date.now(),
order.payment={
paymentMethod:'paypal',
paymentResult:{
    payerID:req.body.payerID,
    orderID:req.body.orderID,
    paymentID:req.body.paymentID
}

}
const updatedOrder =await order.save()
res.send({message:"Order is paid", order:updatedOrder})
}
else{
    res.status(404).send({message:"order not found"})
}
    }catch(e){
        console.log(e.message)
        res.status(500).send("order not updated")

    }

})
module.exports =router;