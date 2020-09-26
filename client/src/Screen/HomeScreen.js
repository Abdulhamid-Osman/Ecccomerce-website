import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {listProducts} from '../actions/productActions';
function HomeScreen(props){
    const [searchKeyword,setSearchKeyword]=useState('')
    const[sortOrder,setSortOrder]=useState('')
    const category=props.match.params.id? props.match.id:"";
   const  productList=useSelector((state)=>state.productList);
    const {products,loading,error}=productList;
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(listProducts(category))
        return ()=>{
//
        }
    },[category])
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(listProducts(category,searchKeyword,sortOrder));
    }
    const sortHandler=(e)=>{
        setSortOrder(e.target.value);
        dispatch(listProducts(category,searchKeyword,sortOrder))
    }
    return(
        <>
        {category && <h2>{category}</h2>}
        <ul className="filter">
         <li>
             <form onSubmit={submitHandler}>
    <input name="searchKeyword"onChange={(e)=>setSearchKeyword(e.target.value)}/>
    <button type="submit">search</button>
             </form>
         </li>
         <li>
             sort BY{''}
             <select name="sortOrder"onChange={sortHandler}>
                 <option vlaue="Newest"></option>
                 <option vlaue="lowest"></option>
                 <option vlaue="Highest"></option>
             </select>

         </li>
            
        </ul>
        {loading?(
            <div>Loading...</div>
        ):error?( <div>{error}</div>
            ):(
                <ul className="products">
                    {products.map((product)=>(
                        <li key ={product.id}>
                            <div className="product">
                                <Link to ={'/products'+product.id}>
                                    <img className="product-image"
                                    src={product.image} alt="product"/>
                                </Link>
                            </div>
                    <div className="product-brand">{product.brand}</div>
                    <div  className="product-price">${product.price}</div>
                        </li>
                    ))}
                </ul>
            )}
            </>
    )
   

}
export default HomeScreen
