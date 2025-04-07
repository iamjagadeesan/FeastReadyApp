import { useState, useEffect, useContext } from 'react'
import Navbar from './components/Navbar.jsx';
import './index.css'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home.jsx';
import Cart from './pages/Cart.jsx';
import PlaceOrder from './pages/PlaceOrder.jsx';
import Payment from './pages/Payment.jsx';
import Orders from './pages/Orders.jsx';
import LoginPopup from './components/LoginPopup.jsx';
import { useMatch } from "react-router-dom";
import {StoreContext} from "./context/StoreContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';

function App() {
  
  const {showLogin, url, setFoodList, setToken, setCartItems, token} = useContext(StoreContext);

  //  const fetchFoodList = async () => {
  //   const response = await axios.get(url + "/api/food/list");
  //   setFoodList(response.data.data);
  // };

  // const loadCartData = async (token) => {
  //   const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
  //   setCartItems(response.data.cartData);
  // };

  // useEffect(() => {
  //   async function loadData() {
  //     await fetchFoodList();
  //     if (localStorage.getItem("token")) {
  //       setToken(localStorage.getItem("token"));
  //       await loadCartData(localStorage.getItem("token"));
  //     }
  //   }
  //   loadData();
  // }, []);

   useEffect(() => {
    AOS.init({
      offset: 10,
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className={`custom-scrollbar saturate-90`}>
    {showLogin?<LoginPopup/>:<></>}
    <div className={`min-h-screen w-full ${showLogin?'h-screen overflow-y-hidden':''}`}>
      <Navbar/>
      <Routes className={`overflow-x-hidden`}>
        <Route path="/" element={<Home/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/order" element={<PlaceOrder/>} />
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
    </div>
  )
}

export default App
