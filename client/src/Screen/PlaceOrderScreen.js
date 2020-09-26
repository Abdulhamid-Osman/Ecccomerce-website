import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../componets/CheckoutSteps';
import {createOrder} from '../actions/orderActions'
function PlaceOrder(props){
    const cart=useSelector((state)=>state.cart)
    const{cartItems,shipping,payment}=cart
    const orderCreate =useSelector((state)=>state.orderCreate)
    const{loading,success,order}=orderCreate;

    const itemPrice=cartItems.reduce((a,c)=>a+c.price*c.qty,0)
    const shippingPrice=itemPrice>100?0:10;
    const taxPrice=0.15*itemPrice;
    const totalPrice=itemPrice+shippingPrice+taxPrice;
    const dispatch=useDispatch()
    const PlaceOrderHandler=(e)=>{
        e.preventDefault()
        dispatch(createOrder({
            orderItems:cartItems,shipping,itemPrice,shippingPrice,taxPrice,totalPrice
        }));
    }
useEffect(()=>{
    if(success){
        props.history.push("/order/" +order._id)
    }

},[success])
    
    
    return <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="placeorder">
            <div className="placeorder-info">
                <h3>shipping</h3>
                <div>
                    {cart.shipping.address},{cart.shipping.city}
                    {cart.shipping.country}
                </div>
            </div>
            <div>
                <h3>payment</h3>
                <div>
                    payment Method:{cart.payment.paymentMethod}
                </div>
            </div>
            <div>
                <ul className="cart-list-container">
                    <li>
                        <h3>Shopping Cart</h3>
                        <div>
                            price
                        </div>
                    </li>
                    {
                        cartItems.length===0?
                        <div>
                            cart is empty
                        </div>
                        :
                        cartItems.map(item=>
                           
                            <li>
                                <div className="cart-image">
                                    <img src={item.image}alt="product"/>
                                </div>
                                <div className="cart-name">
                                    <div>
                                        <Link to ={"/product"+item.product}>
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div>
                                        Qty:{item.qty}
                                    </div>
                                </div>
                                <div className="cart-price">
                                    ${item.price}
                                </div>
                            </li>

                            )
                    }
                </ul>
            </div>
        </div>
        <div className="placeorder-action">
            <ul>
                <li>
                    <button type='button'onClick={PlaceOrderHandler}>
                        placeorder
                    </button>
                </li>
            </ul>
        </div>

    </div>

}
export default PlaceOrder