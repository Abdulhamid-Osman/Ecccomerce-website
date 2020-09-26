import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import {register} from "../actions/userActions";
import {useSelector,useDispatch} from 'react-redux';
function RegisterScren(props){
    const [name,setName]=useState("")
    const[email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [repassword,setRepassword]=useState("")
    const userRegister =useSelector(state=>state.userRegister);
    const {laoding,userInfo,error}= userRegister;
    const dispatch=useDispatch();
    const redirect =props.location.search?props.location.search.split("=")[1]:'/'
    useEffect(()=>{
        if(userInfo){
            props.history.push(redirect)
        }
        return()=>{

            
        }
    },[userInfo]);
    const submitHandler=(e)=>{
       e.preventDefault()
        dispatch(register(name,email,password))
    }
    return<div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">

                <li><h2>Create Account</h2></li>
                <li>
                    {laoding &&<div>loading...</div>}
              {error && <div>{laoding}</div>}
                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type ="name"name="name"id="name"onChange={(e)=>setName(e.target.value)}></input>
                </li>
                <br></br>
                
                <li>
                    <label htmlFor="email">
                       Email
                    </label>
                        <input type="text" name="email"id="email"onChange={(e)=>{setEmail(e.target.value)}}></input>
                </li>
                <br></br>
                <li>
                    <label htmlFor="password">
                     password
                    </label>
                    <input type="password" name="password"id="password"onChange={(e)=>setPassword(e.target.value)}>

                    </input>

                </li>
                <label htmlFor="repassword">
                    Re-password
                </label>
                <li>

                    <input type="password"id="repassword"name="repassword"onChange={(e)=>setRepassword(e.target.value)}></input>
                </li>
                <button type="submit"className="button-primary">Register</button>
                <li>
                    Already have an account?
                    <Link to ={redirect==="/"? "signin":"signin?redirect="+redirect}
                    className="button secondary text-center">create your sariff Account</Link>
                </li>
            </ul>
        </form>
    </div>

}
export default RegisterScren;