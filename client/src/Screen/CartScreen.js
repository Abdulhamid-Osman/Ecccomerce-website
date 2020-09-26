 import React,{useEffect} from 'react'
 import {addTocart,removeFromCart} from '../actions/cartActions'
 import {Link} from 'react-router-dom';
 import {useDispatch,useSelector} from 'react-redux';
 function CartScreen(props){
     const cart=useSelector(state=>state.cart)
     const {cartItems}=props;
     const productId=props.match.params.id
     const qty=props.location.search?
     Number(props.location.search.split("=")[1]):1;
     const dispatch=useDispatch();
     const removeFromCartHandler=(productId)=>{
         dispatch(removeFromCart(productId))
     }
     useEffect(()=>{

        if(productId){
            dispatch(addTocart(productId,qty))
        }
     },[]);
     const checkoutHandler=()=>{
         props.history.push("/signin?redirect=shipping");
     }
     return <div className="cart-list">
         <ul className="cart-list-container">
             <li>
                 <h3>Shopping cart</h3>
                 <div>
                     price
                 </div>
             </li>
             {
                 cartItems.length===0?
                 <div>
                     Cart is empty
                 </div>:
                 cartItems.map(item=>
                    <li>
                        <div className="cart-image">
                            <img src={item.image} alt="product"/>
                        </div>
                        <div className="cart-name">
                            <div>
                                <Link to={"/product"+item.product}>
                                    {item.name}
                                </Link>
                            </div>
                            <div>
                                qty:
                                <select value={item.qty}onChange={(e)=>dispatch(addTocart(item.product,e.target.value))}>
                                    {[...Array(item.countlnStock).keys()].map(x=>
                                        <option key={x+1}value ={ x+1} > {x+1}</option>
                                        )}
                                </select>
                                <button type="button"className="button"onClick={(e)=>removeFromCartHandler(item.product,e.target.value)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="cart-price">
                            ${item.price}
                        </div>
                    </li>
                    )
             }

         </ul>
         
         <h3>
             Subtotal({cartItems.reduce((a,c)=>a+c.qty,0)}items)
             :
             ${cartItems.reduce((a,c)=>a+c.price*qty,0)}

         </h3>
         <button onClick={checkoutHandler}className="button primary full-width"disabled={cartItems.length===0}>
             Proceed to checkout
         </button>
     </div>
    
    
 }
 export default CartScreen