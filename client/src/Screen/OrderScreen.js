import React,{useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';
import paypalButton  from '../componets/PaypalButton'
import {Link} from 'react-router-dom';
import {detailsOrder,payOrder,createOrder} from '../actions/orderActions';
function OrderScreen(props){
     const orderpay=useSelector(state=>state.orderpay);
     const {loading:loadingpay,success:successpay}=props
     const dispatch=useDispatch();
     useEffect(()=>{
         if(successpay){
             props.history("/profile")
         }
         else{
             dispatch(detailsOrder(props.match.params.id))
         }
         return()=>{


         }
     },[successpay])
     const handleSuccessPayment=(paymentResult)=>{
         dispatch(payOrder(order,paymentResult))
     }
     const orderDetails= useSelector(state=>state.orderDetails);
     const {loading,order,error}=props
    return loading?<div>loading....</div>:error?
    <div>{error}</div>:
    <div>
        <div className="placeorder">
            <div className="placeorder-info">
                <div>
                    <h3>Shipping</h3>   
                </div>
                <div>
                    {order.shippping.address},{order.shippping.city},{order.shippping.country}
                </div>
                <div>
                    {order.isDelivered?"Delivered at"+ order.deliveredAt:"Not Delivered"}
                </div>
            </div>
        </div>
        <h3>payment</h3>
    <div> payment Method:
        {order.payment.paymentMethod}</div>
        <div>
            {order.ispaid?"paid At"+order.paidAt:"Not paid"}
        </div>
        <div>
            <ul className="cart-list-container">
                <li>
                    <h3>shopping cart</h3>
                    <div>
                        price
                    </div>
                </li>
                {
                    order.orderItems.length===0?
                    <div>
                        cart is empty
                    </div>
                    :
                    order.orderItems.map(item=><li key={item._id}>
                        <div className="cart-image">
                            <img src={item.name}alt="product"/>
                               
                        </div>
                        <div className="cart-name">
                            <div> 
                                <Link to ={"/product"+ item.product}>
                                    {item.name}
                                </Link>
                            </div>
                        </div>
                        QTY:{item.qty}

                        <div>
                            <div className="cart-price">
                                ${item.price}
                            </div>
                        </div>
                    </li>
                    )
                }
            </ul>
        </div>
        <div className="placeorder-action">
            <ul>
                <li className="place-order-action-payment">
                    {loadingpay&&<div>Finishing payment...</div>}
                    {!order.ispaid && 
                    <paypalButton  amount={order.totalprice}
                    onSuccess={handleSuccessPayment}/>
                }
                </li>
                
                <h3>order summary</h3>
                
                <li>
                    <div>items</div>
            <div>${order.itemsprice}</div>
                </li>
                <li>
                    <div>
                    Shipping
                    </div>
            <div>${order.shipppingPrice}</div>
                </li>
                <li>
                    <div>order total</div>
            <div>${order.totalprice}</div>
                </li>
            </ul>
        </div>
    </div>
    
}
export default OrderScreen;