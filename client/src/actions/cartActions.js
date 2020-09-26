import Axios from 'axios'
import cookies from 'cookies';
const {CART_ADD_ITEM,CART_REMOVE_ITEM,CART_SAVE_SHIPPING,CART_SAVE_PAYMENT} =require('../constant/cartconstant')
const addTocart =(productId,qty)=> async(dispatch,getstate)=>{
    try{
        const {data} =await Axios.get("/api/products"+ productId);
        dispatch({
            type:CART_ADD_ITEM,
            payload:{
                product:data._id,
                name:data.name,
                image:data.image,
                price:data.price,
                qty:data.qty
            }
        });
        const {cart:{cartItems}}=getstate();
        cookies.set("cartitems",
        JSON.stringify(cartItems))
    }catch(error){
    }
}

const removeFromCart=(product)=>(dispatch,getstate)=>{
dispatch({
    type:CART_REMOVE_ITEM,
    payload:product
})
const {cart:{cartItems}}=getstate();
cookies.set("cartitems",JSON.stringify(cartItems))

}
const saveShipping=(data)=>(dispatch)=>{

        dispatch({
            type:CART_SAVE_SHIPPING,
            payload:data
        })

    
}
const savepayment=(data)=>(dispatch)=>{
    dispatch({type:CART_SAVE_PAYMENT,
    payload:data
})    

}
export {addTocart,removeFromCart,savepayment,saveShipping}