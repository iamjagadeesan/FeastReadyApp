import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import { MdDelete } from 'react-icons/md';
import { BsBasket3 } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { BiCartAdd } from "react-icons/bi";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from 'react-toastify';

const Cart = () => {
  const navigate = useNavigate();
  const { url, cartItems, basket, food_list, removeFromCart, getTotalCartAmount, TopView, setTotalAmt, discount, setDiscount, token, setShowLogin} = useContext(StoreContext);
  
  const subTotal = getTotalCartAmount();
  const [promoCode, setPromoCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');

  document.body.style.overflowY="auto";
  
  // Function to generate a random 4-digit promo code
  const generatePromoCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Determine discount percentage based on subtotal
  const getDiscountPercentage = () => {
    if (subTotal > 1000) return 25;
    if (subTotal > 500) return 15;
    if (subTotal > 250) return 10;
    return 0;
  };

  // Set promo code if eligible for discount
  useEffect(() => {
    const discountPercent = getDiscountPercentage();
    if (discountPercent > 0) {
      setPromoCode(generatePromoCode());
    } else {
      setPromoCode('');
    }
  }, [subTotal]);

  // Apply promo code
  const applyPromoCode = () => {
    if (enteredCode === promoCode) {
      setDiscount((subTotal * getDiscountPercentage()) / 100);
      toast.success("Promo code applied successfully!",{
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
    })
    } else {
      toast.error("Invalid promo code!",{
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
        color: "red", // Yellow text
        fontWeight: "bold",
        fontSize: "14px",
        borderRadius: "1rem",
        overflow:"hidden",
      },
    })
    }
  };

  return (
    <div data-aos="flip-right" data-aos-duration="500" data-aos-offset="10" 
    className="lg:p-6 md:p-12 bg-gradient-to-br from-green-950 via-green-900 to-green-800 min-h-screen" id="cart">
      {/*<OrderSuccess/>*/}
      <h2 className="py-4 font-f text-3xl md:text-4xl lg:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-300 to-yellow-500">
        Shopping Cart
      </h2>

      {getTotalCartAmount()>0 ? (
        <div className="font-e max-w-4xl mx-auto bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white p-2 md:p-6 lg:p-6 md:rounded-xl lg:rounded-xl shadow-lg pb-8">
          <div className="grid text-center text-xs md:text-base grid-cols-6 font-semibold text-yellow-300 border-b pb-2">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>

          <div className="divide-y">
            {food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <div key={index} className="grid grid-cols-6 items-center py-4 text-xs md:text-base place-items-center text-center">
                    <img src={url+"/images/"+item.image} alt={item.name} className="size-16 object-cover rounded-lg" />
                    <p>{item.name}</p>
                    <p className="font-sans">₹{item.price.toFixed(2)}</p>
                    <p>{cartItems[item._id]}</p>
                    <p className="font-semibold font-sans">₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                    <button onClick={() => removeFromCart(item._id)} className="cursor-pointer w-full flex justify-center items-center text-green-950">
                      <MdDelete className="size-6" />
                    </button>
                  </div>
                );
              }
            })}
          </div>

          {/* Promo Code Section */}
          {promoCode && (
            <div className="text-xs md:text-base bg-gradient-to-br from-green-800 via-green-700 to-green-600 p-4 rounded-xl shadow-md">
              <p className="mb-2">Use this promo code to get a discount: <span className="font-bold text-yellow-300">{promoCode}</span></p>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Promo Code"
                  value={enteredCode}
                  onChange={(e) => setEnteredCode(e.target.value)}
                  className="flex-1 p-1 px-2 placeholder:text-gray-200 w-1/2 border-2 border-green-400 bg-white/10 text-gray-100 focus:outline-none rounded-lg"
                />
                <button onClick={applyPromoCode} className="cursor-pointer bg-yellow-300 font-bold text-green-800 px-4 py-2 rounded-lg hover:bg-yellow-400 shadow-md shadow-green-950">
                  Apply
                </button>
              </div>
            </div>
          )}

          {/* Cart Totals */}
          <div className="text-xs md:text-base bg-gradient-to-br from-green-800 via-green-700 to-green-600 p-4 rounded-xl shadow-md mt-6">
            <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-400">
              Cart Totals
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="font-sans">₹{subTotal.toFixed(2)}</p>
              </div>
              <div className={`${discount<1?'hidden':'block'} flex justify-between`}>
                <p>Discount</p>
                <p className="font-sans">₹{discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p className="font-sans">₹{(subTotal - discount).toFixed(2)}</p>
              </div>
            </div>
            <button 
              onClick={() => { if(token){navigate('/order'); TopView(); setTotalAmt(subTotal - discount);}else{navigate("/");setShowLogin(true);} }} 
              className="cursor-pointer w-full mt-4 bg-yellow-300 text-green-800 font-semibold py-2 rounded-lg shadow-md shadow-green-950">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="h-[40vh] flex justify-center items-center gap-2 text-green-950 text-2xl font-bold">
            Empty Cart <BsBasket3 />
          </div>
          <div className="flex justify-center items-center">
            <button 
              onClick={() => { navigate('/'); TopView(); }} 
              className="hover:text-green-800 hover:bg-gradient-to-br from-yellow-100 to-yellow-400 cursor-pointer text-xl text-yellow-300 font-semibold p-2 flex items-center border-2 border-b-yellow-300 border-r-yellow-300 border-t-yellow-200 border-l-yellow-200 rounded-lg transition duration-200 ">
              Add Items <BiCartAdd className="text-2xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
