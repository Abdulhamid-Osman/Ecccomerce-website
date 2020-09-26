import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux';
import Axios from 'axios';
import { saveProduct, listProducts,deleteProduct} from '../actions/productActions'
 function ProductScreen(props){

    const[modalVisible,setModalVisible]=useState(false)
    const[id,setId]=useState("")
    const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[image,setImage]=useState("")
    const[brand,setBrand]=useState("")
    const[category,setCategory]=useState("")
    const[description,setDescription]=useState("")
    const[countlnStock,setCountlnStock]=useState("")
    const[uploading,setUploading]=useState(false)
    const productList=useSelector((state)=>state.productList)
    const{loading,products,error}=productList
    const productSave=useSelector((state)=>state.productSave)
    const {success:successSave,loadingSave,errorSave}=props
    const productdelete=useSelector((state)=>state.productdelete)
    const{successDelete}=props

    const dispatch=useDispatch()
    useEffect(()=>{
        if(successSave){
            setModalVisible(false)
        }
        dispatch(listProducts())
    },[successSave,successDelete])
    const openModal=(product)=>{
        setModalVisible(true)
        setId(product._id)
        setName(product.name)
        setPrice(product.price)
        setDescription(product.description)
        setBrand(product.brand)
        setCategory(product.category)
        setImage(product.image)
        setCountlnStock(product.countlnStock)

    }
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveProduct({
                _id:id, name, price, image, brand, category, countlnStock, description
            })
        )
    }
    const deleteHandler=(product)=>{
        dispatch(deleteProduct(product._id))
    };
    const uploadingFileHandler=(e)=>{
    
   const file=e.target.files[0];
   const bodyFormatData=new  FormData()
   bodyFormatData.append('public/images',file)
   
   Axios.post('/api/uploads',bodyFormatData,{
       headers:{
           'Content-Type':'multipart/form-data'
       }
   })
   .then((response)=>{
       setImage(response.data)
       alert("The file succesully uploaded")
   }).catch((err)=>{
       console.log(err);
       setUploading(false)
   })
    }


     return(
         <div className="content content-margined">
             <div className="product-header">
                 <h3>products</h3>
                 <button className="button primary"onClick={()=>openModal({})}>
                     <h2>create product</h2>
                     <li>
                         {loadingSave && <div>loading</div>}
     {errorSave&&<div>{errorSave}</div>}
                     </li>
                 </button>
             </div>
             {modalVisible&&(
                 <div className="form">
                     <form onSubmit={submitHandler}>
          <ul className="form-container">



              <li>
                  <h2>Create products</h2>
              </li>
              <li>
                  <label htmlFor ="name">Name</label>
                  <input type="text"name="name"id="name"onChange={(e)=>setName(e.target.value)}>
            
                  </input>
              </li>
              <li>
                  <label htmlFor="price">Price</label>
                  <input type="text"name="price"value={price}id="price"onChange={(e)=>setPrice(e.target.value)}></input>

              </li>
              <li>
                  <label htmlFor="image">Image</label>
                  <input type="text"name="image"value={image}id="image"onChange={((e)=>e.target.value)}></input>
                  <input type="file"onChange={uploadingFileHandler}></input>
                  {uploading && <div>uploading...</div>}
              </li>
              <li>
                  <label htmlFor ="brand">Brand</label>
                  <input type="text"name="brand"value={brand}id="brand"onChange={(e)=>setBrand(e.target.value)}></input>
              </li>
              <li>
                  <label htmlFor="countlnStock">countlnStock</label>
                  <input type="text"name="countlnStock"value={countlnStock}id="countlnStock"onChange={(e)=>setCountlnStock(e.target.value)}></input>
              </li>
              <li>
                  <label htmlFor="description">description</label>
                  <input type="text"name="description"value={description}id="description"onChange={(e)=>setDescription(e.target.value)}></input>
              </li>
              <li>
                  <label htmlFor="category">category</label>
                  <textarea
                  name="category"value={category}id="category"onChange={(e)=>setCategory(e.target.value)}></textarea>
              </li>
              <li>
                  <button type="submit"className="button primary">
                      {id? 'update':'Create'}
                  </button>
              </li>
              <li>
                  <button type="button"onClick={()=>setModalVisible(false)}className="button secondary">Back</button>
              </li>
          </ul>
                     </form>
                     </div>

             )}
             <div className="product-list">
                 <table className="table">
                     <thead>
                         <tr>
                         <th>ID</th>
                         <th>Name</th>
                         <th>Price</th>
                         <th>Category</th>
                         <th>Brand</th>
                         <th>Action</th>
                         </tr>
                     </thead>
                     <tbody>
                         {products.map(product=><tr key={product._id}>
                                <td>{product._id}</td>
                                 <td>{product.name}</td>
                                 <td>{product.price}</td>
                                 <td>{product.category}</td>
                                 <td>{product.brand}</td>
                                 <td>
                                     <button className="button"onClick={()=>openModal(product)}>
                                         Edit
                                     </button> {''}
                                     <button className="button"onClick={()=>deleteHandler(product)}>
                                         Delete
                                     </button>{''}
                                 </td>
                             </tr>
                         )}
                     </tbody>
                 </table>
             </div>
             
           
         </div>
     )

 }   
 export default ProductScreen                                             