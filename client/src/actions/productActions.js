import { PRODUCT_LIST_REQUEST,
 PRODUCT_LIST_SUCCESS,
 PRODUCT_LIST_FAIL,
 PRODUCT_DETAILS_REQUEST,
PRODUCT_DETAILS_SUCCESSS,
PRODUCT_DETAILS_FAIL,
 PRODUCT_SAVE_REQUEST,
PRODUCT_SAVE_SUCCESS,
PRODUCT_SAVE_FAIL,
PRODUCT_DELETE_REQUEST,
 PRODUCT_DELETE_SUCCESS,
 PRODUCT_DELETE_FAIL,
PRODUCT_REVIEW_SAVE_REQUEST,
 PRODUCT_REVIEW_SAVE_SUCCESS,
PRODUCT_REVIEW_SAVE_FAIL,
 

} from '../constant/productConstant';
import Axios from 'axios';
const listProducts=(
    category="",
    searchKeyword="",
    sortOrder=""
)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data}=await Axios.get('/api/products?category='+ category
        +'&searchKeyword ='+searchKeyword + '&sortOrder='+sortOrder);
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});
    }
    catch(error){
     dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
};
const saveProduct=(product)=>async(dispatch,getstate)=>{
    try{
        dispatch({type:PRODUCT_SAVE_REQUEST,payload:product})
        const{
            userSignin:{userInfo},
        }=getstate()
        if(!product){
            const {data}=await Axios.post('/api/products',product,{
      headers:{
          Authorization:'Bearer'+userInfo.token,
      }
        })
            dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
   
        }
        else{
            const{data}=await Axios.put('api/products/'+product,{
                headers:{
                    Authorization:'Bearer'+userInfo.token
                }
            })
            

        }
    }
    catch(error){

        dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})
    }
}
const detailsProduct=(productId)=>async(dispatch)=>{

    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId})
        const {data}=await Axios.get('/api/products/'+productId);
        dispatch({type:PRODUCT_DETAILS_SUCCESSS,payload:data})
    }
    catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message})
    }
}
const deleteProduct=(productId)=>async(dispatch,getstate)=>{

    try{
        const{ 
            userSignin:{userInfo},
        }=getstate()
        dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId})
        const{data}=await Axios.delete('/api/products/'+ productId,{
            headers:{
                Authorization:'Bearer'+userInfo.token
            }
        })
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data})
    }
    catch(error){
        dispatch({type:PRODUCT_DELETE_FAIL,payload:error.message})

    }
}
const saveProductReview=(productId,review)=>async(dispatch,getstate)=>{

    try{
        const{
            userSignin:{
            userInfo:{token}
            },
        }=getstate()
    
    

        dispatch({type:PRODUCT_REVIEW_SAVE_REQUEST,payload:review})
        const {data}=await Axios.post('/api/products/&{productId}/reviews',review,{

            headers:{
                Authorization:'Bearer'+token
            }
        })
        dispatch({type:PRODUCT_REVIEW_SAVE_SUCCESS,payload:data})

    }
    catch (error){
        dispatch({type:PRODUCT_REVIEW_SAVE_FAIL,payload:error.message
        })

    }
}
    export {listProducts,detailsProduct,deleteProduct,saveProduct,saveProductReview}
    
        
    

