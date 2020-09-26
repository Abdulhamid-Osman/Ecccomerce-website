
import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {listorders,deleteOrder} from '../actions/orderActions';
function OrdersScreen(props){
    const orderList=useSelector((state)=>state.orderList)
    const{orders,loading}=orderList;
    const orderDelete=useSelector((state)=>state.orderDelete)
    const{loading:loadingDelete,successDelete,errorDelete}=props
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(listorders())
        return()=>{

        }
    },[successDelete])
    const deleteHandler=(order)=>{
        dispatch(deleteOrder(order._id))
    }
    return loading?<div>loading..</div>:

        <div className="content-content-margined">
       <div className="order-header">
           <h3>Orders</h3>
       </div>
       <div className="order-list">
           <table className="table">
               <thead>
                   <tr>
                    <th>ID</th>
                    <th>Date</th>
                    <th>TOTAL</th>
                    <th>USER</th>
                    <th>PAID</th>
                    <th>PAID AT</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>                    
                   </tr>
               </thead>
               <tbody>
                   
               {orders.map(order=>(
                             <tr key={order.id}>
                                 <td>{order.createdAt}</td>
                                 <td>{order.totalPrice}</td>
                                 <td>{order.user.name}</td>
                                 <td>{order.isPaid.toString()}</td>
                                 <td>{order.isDeliveredAt.toString()}</td>
               <td>{order.deliveredAt}</td>
                                 <td>
                                 <Link to={"/order/"+order.id}className="button secondary">Details</Link>
                                 {''}
                                 <button type="button"onClick={()=>deleteHandler(order)} className="button secondary">Delete</button>
                                 </td>
                             </tr>
                         ))}
               </tbody>
           </table>
       </div>
            
        </div>

    
}
export default OrdersScreen