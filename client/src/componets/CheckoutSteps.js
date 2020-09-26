import React from 'react';
function CheckoutSteps(props){

    return <div  className="checkoutSteps">
        <div className ={props.step1 ?'active':""}>Signin</div>
        <div className ={props.step2 ?'active':""}>Shipping</div>
        <div className ={props.step3 ?'active':""}>payment</div>
        <div className ={props.step4 ?'active':""}>place Order</div>
    </div>
}
export default CheckoutSteps;