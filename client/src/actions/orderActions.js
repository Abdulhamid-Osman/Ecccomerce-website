import Axios from 'axios'
const {
 ORDER_CREATE_REQUEST,
 ORDER_CREATE_SUCCESS,
 ORDER_CREATE_FAIL,
 ORDER_DETAILS_REQUEST,
 ORDER_DETAILS_SUCCESS,
 ORDER_DETAILS_FAIL,
 ORDER_PAY_REQUEST,
 ORDER_PAY_SUCCESS,
 ORDER_PAY_FAIL,
 MY_ORDER_LIST_REQUEST,
 MY_ORDER_LIST_SUCCESS,
 MY_ORDER_LIST_FAIL,
 ORDER_DELETE_REQUEST,
 ORDER_DELETE_SUCCESS,
 ORDER_DELETE_FAIL,
 ORDER_LIST_REQUEST,
 ORDER_LIST_SUCCESS,
 ORDER_LIST_FAIL,
} =require('../constant/orderConstant')
const createOrder=(order)=>async(dispatch,getstate)=>{
    try{
        dispatch({
           type: ORDER_CREATE_REQUEST,payload:order
        })
        const {userSignin:{userInfo}}=getstate();
         const {data:{ data:newOrder}}= await Axios.post("/api/orders",order,{
             headers:{
                 Authorization: 'Bearer'+userInfo.token
             }
         });
         dispatch({
             type:ORDER_CREATE_SUCCESS,payload:newOrder
         })
         
    }
    catch(error){
        dispatch({
            type:ORDER_CREATE_FAIL,payload:error.message
        })

    }
}
const listMyorders=()=>async(dispatch,getstate)=>{
    try{
        dispatch({
            type:MY_ORDER_LIST_REQUEST
        })
        const {userSignin:{userInfo}}=getstate();
        const {data} = await  Axios.get("/api/orders/mine",{
            headers:{
                Authorization:'Bearer'+ userInfo.token
            }

        })
        dispatch({type:MY_ORDER_LIST_SUCCESS,payload:data})
    }catch(error){

        dispatch({
            type:MY_ORDER_LIST_FAIL,payload:error.message
        })
    
    }
}
const listorders=()=>async(dispatch,getstate)=>{

    try{

        dispatch({
            type:ORDER_LIST_REQUEST
        })
        const {userSignin:{userInfo}}=getstate();
        const {data}= await  Axios.get("/api/orders",{

            headers:{
                Authorization:'Bearer'+userInfo.token
            }
        })
        dispatch({type:ORDER_LIST_SUCCESS,payload:data})
    }
    catch(error){
dispatch({
    type:ORDER_LIST_FAIL,payload:error.message
})

    }
}
const detailsOrder=(orderId)=>async(dispatch,getstate)=>{
    try{

        dispatch({
            type:ORDER_DETAILS_REQUEST,payload:orderId

        })
        const {userSignin:{userInfo}}=getstate()
        const {data}=await Axios.get("/api/orders/"+orderId,{
            headers:{

                Authorization:'Bearer'+userInfo.token
            }
        })
        dispatch({type:ORDER_DETAILS_SUCCESS,payload:data})

    }
    catch(error){

        dispatch({type:ORDER_DETAILS_FAIL,
        payload:error.message})
    }
}
const payOrder=(order,paymentResult)=>async(dispatch,getstate)=>{
    try{
        dispatch({type:ORDER_PAY_REQUEST,payload:paymentResult})
        const {userSignin:{userInfo}}=getstate()
        const {data}=await Axios.put("/api/orders/" + order._id +"/pay",paymentResult,{
            headers:{
                Authorization:'Bearer'+ userInfo.token
            }
        });
        dispatch({type:ORDER_PAY_SUCCESS,payload:data})
    } catch(error){
        dispatch({type:ORDER_PAY_FAIL,
        payload:error.message})
    }
    
}
const deleteOrder=(orderId)=>async(dispatch,getstate)=>{

    try{

        dispatch({type:ORDER_DELETE_REQUEST,payload:orderId})
        const {userSignin:{userInfo}}=getstate();
        const {data}=await Axios.delete("/api/orders/"+orderId,{
            headers:{
                Authorization:'Bearer'+userInfo.token
            }
        })
        dispatch({type:ORDER_DELETE_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:ORDER_DELETE_FAIL,payload:error.message})
    }
}
export {createOrder,detailsOrder,payOrder,listMyorders,listorders,deleteOrder}