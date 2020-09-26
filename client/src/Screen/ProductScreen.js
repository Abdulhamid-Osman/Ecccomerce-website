import React,{useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import {detailsProduct,saveProductReview} from '../actions/productActions';
import {PRODUCT_REVIEW_SAVE_RESET} from '../constant/productConstant'
function ProductScreen(props){
    const[qty,setQty]=useState('1')
    const [comment,setComment]=useState('')
    const userSignin =useSelector((state)=>state.userSignin)
    const {userInfo}=userSignin
    const productDetails=useSelector((state)=>state.productDetails)
   const {product,loading,error}=props;
   const productReviewSave=useSelector((state)=>state.productReviewSave)
   const{success:productSaveSuccess}=props
  
   const dispatch=useDispatch()

useEffect(()=>{
    if(productSaveSuccess){
        alert('Review submiited succcessfully')
        setComment("")
        dispatch({type:PRODUCT_REVIEW_SAVE_RESET})

    }
    dispatch(detailsProduct(props.match.params.id))
    return()=>{

    }
},[productSaveSuccess])
const submitHandler=(e)=>{
    e.preventDeafult();
    dispatch(saveProductReview(props.match.params.id,{
        name:userInfo.name,
        comment:comment
    }))
}
const handleAddTocart=()=>{
    props.history.push('/cart/'+props.match.params.id+'?qty')
}
return(
<div>
    <div className="back-to-result">
        <Link to ="/">Back to result</Link>
    </div>
    {loading ? (
        <div> loading..</div>

    ):error?(
        <div>{error}</div>
    ):(
        <>
        <div className="details">
            
        <div className="details-image">
            <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
            <ul>
                <li>
                    name:
    <h4>{product.name}</h4>
                </li>
                <li>
    price: <b>${product.price}</b>
                </li>
                <li>
                    Description:
    <div>{product.description}</div>
                </li>
                </ul>
            
        </div>
        <div className="details-action">
            <ul>
            <li>
                status:{""}
                {product.countlnStock>0? 'In stock':'unvailable'}
            </li>
            <li>
                Qty:{""}
                <select value={qty}onChange={(e)=>{
                    setQty(e.target.value)
                }}>
                {[...Array(product.countlnStock).keys()].map((x)=>(
                    <option key={x+1}/>
                ))}/</select>
            </li>
            <li>
                {product.countlnStock>0 && (
                    <button onClick={handleAddTocart}
                    className="button-primary">
                        Add to cart
                    </button>
                )}
            </li>
            </ul>
        </div>
        <div className="content-margined">
            <li>
     <h3>Write a customer review</h3>
     {userInfo?(
        <form onSubmit={submitHandler}>
            <ul className="form-content">
                <li>
                <label htmlFor="comment">comment</label>
                <textarea name="comment"value={comment}onChange={(e)=>setComment(e.target.value)}></textarea> 
                </li>
                <li>
                    <button type="submit"className="button-primary">submit</button>
                </li>
            </ul>
        </form>
     ):(
         <div>
             please <Link to ="/signin">sign-in</Link> to leave a comment
         </div>
     )}
     
                </li>
                </div>
        </div>
        </>
    )}
</div>
)
}
export default ProductScreen