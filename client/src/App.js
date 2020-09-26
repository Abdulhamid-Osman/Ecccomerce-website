import React from 'react';
import {BrowserRouter,Route,Link} from 'react-router-dom'
import OrdersScreen from './Screen/OrdersScreen';
import SigninScreen from './Screen/SigninScreen'
import RegisterScreen from './Screen/RegisterScreen'
import ProfileScreen from './Screen/ProfileScreen';
import OrderScreen  from './Screen/OrderScreen';
import CartScreen from './Screen/CartScreen';
import ShippingScreen from './Screen/shippingScreen';
import PaymentScreen from './Screen/PaymentScreen';
import placeorderScreen from './Screen/PlaceOrderScreen';
import ProductsScreen from './Screen/productsScreen';
import HomeScreen  from './Screen/HomeScreen';
import ProductScreen from './Screen/ProductScreen';
import './App.css';
import { useSelector } from 'react-redux';
function App() {
  const userSignin=useSelector((state)=>state.userSignin)
  const {userInfo}=userSignin
  const openMenu=()=>{
    document.querySelector('.sidebar').classList.add('open')
  }
const closeMenu=()=>{
  document.querySelector('.sidebar').classList.remove('open')
}

  return (
    <div>
    <BrowserRouter>
    <div className ="grid -container">
      <header className="header">
     
        <div className="brand">
        <button onClick={openMenu}>$#8976;</button>
        <Link to="/">sarriff</Link>
        </div>
        <div className="header-links">
        <a href="cart.html">Cart</a>
        {userInfo?(
          <Link to ="/profile">{userInfo.name}</Link>
        ):(
          <Link to ="/signin">sign in</Link>
        )
      }
      <ul className="dropdown-content">
  <Link to ="/orders">Orders</Link>
  <Link to ="/products">Products</Link>
      </ul>
      </div>
      </header>
      <aside className="header"> 
      <h3>Shopping category</h3>
      <button className="sidebar-close-button"onClick={closeMenu}>
        X
      </button>

      <ul className="categories">
        <li>
          <Link to ="/category/trousers">trousers

          </Link>
          </li>
          <li>
            <Link to ="/category/shirts">shirts</Link>
          </li>
          
          </ul>   
          
</aside>
    </div>
    <main className="main">
      <div className="content">
        <Route path ="/orders"component={OrdersScreen}/>
        <Route path="/signin"component={SigninScreen}/>
        <Route path="/register"component={RegisterScreen}/>
        <Route path="/profile"component={ProfileScreen}/>
        <Route path="/order"component={OrderScreen}/>
        <Route path ="/cart"component={CartScreen}/>
        <Route path="/shipping"component={ShippingScreen}/>
        <Route path="/payment"component={PaymentScreen}/>
        <Route path="/placeorder"component={placeorderScreen}/>
        <Route path="/products"component={ProductsScreen}/>
        <Route path="/home"component={HomeScreen}/>
        <Route path="/product"component={ProductScreen}/>
      </div>
    </main>
    
<footer className="footer">All right reserved</footer>
      </BrowserRouter>
      </div>
  );
}

export default App;
