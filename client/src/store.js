
import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {
    orderDeleteReducer,
    orderDetailsReducer,
    orderPayReducer,
    myOrderListReducer,
    orderListReducer,
    orderCreateReducer,
} from './reducers/orderReducer'
import {
    ProductDeleteReducer,
    ProductDetailsReducer,
    productListReducer,
    ProductReviewSaveReducer,
    ProductSaveReducer,
} from './reducers/productReducer'
import {
    userRegisterReducer,
    userSigninReducer,
    userUpdateReducer,
} from './reducers/userReducer';

import {cartReducer} from './reducers/cartReducer';
const reducer =combineReducers({
    cart:cartReducer,
    orderCreate:orderCreateReducer,
    orderList:orderListReducer,
    orderPay:orderPayReducer,
    orderDetails:orderDetailsReducer,
    orderDelete:orderDeleteReducer,
    myOrderList:myOrderListReducer,
    userRegister:userRegisterReducer,
    userSignin:userSigninReducer,
    userUpdate:userUpdateReducer,
    productList:productListReducer,
    productDetails:ProductDetailsReducer,
    ProductSave:ProductSaveReducer,
    productDelete:ProductDeleteReducer,
    ProductReviewSave:ProductReviewSaveReducer
});
const store =createStore(
    reducer,
    applyMiddleware(thunk))
export  default store;
