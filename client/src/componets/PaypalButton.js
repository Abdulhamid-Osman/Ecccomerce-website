import React ,{useState,useEffect} from 'react';
import ReactDom from 'react-dom'
import Axios from 'axios';
   function PaypalButton(props){
    const[sdkReady, setSdkReady] =useState(false)
    const addPaypalSdk=async ()=>{
        const result=await Axios.get("/api/config/paypal");
        const clientID =result.data;
        const script =document.createElement('script');
        script.type ='text/javascript';
        script.src='https://www.paypal.com/sdk/js?client-id =' +clientID;
        script.async=true;
        script.onload=()=>{
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }
    
        const createOrder =(data,actions)=>actions.order.create({


        purchase_units:[
            {

                amount:{

                    currency_code:"USD",
                    value:props.amount
                }
            }
        ]
    })
    const onApprove= (data,actions)=>actions.order
    .capture()
    .then(details=>props.onsuccess(data,details))
    .catch(err=>console.log(err))
    useEffect(()=>{
        if(!window.paypal){
            addPaypalSdk()
        }
        return()=>{

            //
        }
    },[]);
    if(!sdkReady){

        return <div> loading...</div>
    }
    const Button =window.paypal.Button.driver('react',{React,ReactDom
    })
    return <Button {...props} createOrder={(data,actions)=>{
        createOrder(data,actions)
    }}
    onApprove={(data,actions)=>onApprove(data,actions)}/>
}

export  default PaypalButton;