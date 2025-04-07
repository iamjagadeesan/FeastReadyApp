import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const navigate = useNavigate();
  const [search,setSearch] = useState("");
  const [searchMode,setSearchMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartCount, setCartCount] = useState(0);
  const [menu, setMenu] = useState("home");
  const [basket, setBasket] = useState(false);
  const [token, setToken] = useState("");
  const [totalAmt,setTotalAmt] = useState(0);
  const [discount, setDiscount] = useState(0);

  const url = import.meta.env.VITE_API_URL;

  // Scroll to a section smoothly
  const ToView = (title) => {
    document.getElementById(title)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // Scroll to the top of the page
  const TopView = () => {
    setTimeout(() => {
      document.getElementById("top")?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  // Function to update cart count based on cart items
  useEffect(() => {
    let count = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
    setCartCount(count);
  }, [cartItems]);

  // Add item to cart
  const addToCart = async (itemId) => {

    toast.success("Added to Cart",{
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "white", // Dark Gray background
        color: "#16a34a", // Yellow text
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "1rem",
        overflow:"hidden",
      },
    });
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));

    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    toast.success("Removed from Cart",{
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "white", // Dark Gray background
        color: "#16a34a", // Yellow text
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "1rem",
        overflow:"hidden",
      },
    });
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId]; // Remove item completely if quantity reaches 0
      }
      return newCart;
    });

    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  // Calculate total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Fetch food list from API
  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  // Load cart data for logged-in user
  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };

  // Check if cart is empty and update basket state
  useEffect(() => {
    setBasket(Object.keys(cartItems).length !== 0);
  }, [cartItems]);

  // Initial data loading
  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  // Context value to be passed to children
  const contextValue = {
    search,
    setSearch,
    searchMode,
    setSearchMode,
    url,
    menu,
    setMenu,
    ToView,
    TopView,
    basket,
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    cartCount,
    totalAmt,
    setTotalAmt,
    discount,
    setDiscount,
    showLogin,
    setShowLogin
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
