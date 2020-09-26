import React,{useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {savepayment} from '../actions/cartActions';
import CheckoutSteps from '../componets/CheckoutSteps'
function  PaymentScreen(props){
    const[paymentMethod,setPaymentMethod]= useState("");
    const dispatch=useDispatch();
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(savepayment({paymentMethod}))
        props.history.push('/placeorder')

    }
    return<div>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Payment</h2>
                    </li>
                    <li>
                        <div>
                            <input type="radio"name="paymentMethod"id="paymentMthod"value="paypal"onChange={(e)=>setPaymentMethod(e.target.value)}></input>
                        </div>
                    </li>
                    <li>
                        <button type="submit"className="button primary">
                            continue
                        </button>
                    </li>
                </ul>
            </form>
        </div>
    </div>

}
export default PaymentScreen;