import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {logout,update} from '../actions/userActions';
import {listMyorders} from '../actions/orderActions';
function ProfileScreen(props){
     const[name,setName]=useState("");
     const [password,setPassword]=useState("");
     const [email,setEmail]=useState("")
     const dispatch=useDispatch()
     const userSignin =useSelector(state=>state.userSignin)
     const {userInfo}=props;
     const handlelogout=()=>{
         dispatch(logout())
         props.history.push("/signin")
     }
     const submitHandler=(e)=>{
         e.preventDefault()
         dispatch(update({userId:userInfo.id,email,name,password}))
     }
     const userUpdate=useSelector(state=>state.userUpdate)
     const{success,loading,error}=props  
     const myorderList= useSelector(state=>state.myorderList)
     const {loading:loadingOrders,orders,error:errorOrders}=props
    
     useEffect(()=>{
         if(userInfo){
             console.log(userInfo.name)
             setEmail(userInfo.email)
             setName(userInfo.name)
             setPassword(userInfo.password)
         }
         dispatch(listMyorders())
         return()=>{

         }
     },[userInfo]);
     return <div className="profile">
    <div className="profile-info">

        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li className="form-container">
                        <h2>User profile</h2>
                    </li>
                    <li>
                        {loading&& <div>loading</div>}
                        {error && <div>error</div>}
                       
                        {success && <div>profile Saved Succesfully</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Name
                        </label>
                    <input value={name}type="name"name="name"id="name"onChange={(e)=>setName(e.target.value)}>

                    </input>

                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                        <input value={email}type="email"name="email"id="email"onChange={(e)=>setEmail(e.target.value)}>

                        </input>
                    </li>
                    <li>
                        < label htmlFor="passsword"> 
                        passsword
                         </label>

                            <input value={password}type="password"name="password"id="password"onChange={(e)=>setPassword(e.target.value)}>

                            </input>
                            <li>
                                <button type="submit"className="button-primary">update</button>
                            </li>
                      
        <li> 
            <button type="button"onClick={handlelogout}className="button secondary full width">logout</button>
        </li>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    <div className="profile-orders content -margined">
    {
        loadingOrders? <div>loading..</div>:
        errorOrders ? <div>{errorOrders}</div>:

    <table className="table">
        <thead>
            <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
            </tr>
        </thead>
        <tbody> 
            {orders.map(order=><tr key={order._id}>

            <td>{order._id}</td>
            <td>{order.createdAt}</td>
            <td>{order.totalPrice}</td>
            <td>{order.isPaid}</td>
            <td>
                <Link to ={"/order/"+order._id}>DETAILS</Link>

            </td>
            </tr>)} 
        </tbody>
    </table>
    }

     </div>
     </div>
     


}
export default ProfileScreen;