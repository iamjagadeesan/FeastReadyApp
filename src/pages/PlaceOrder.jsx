import React, {useState, useEffect,useContext } from 'react';
import { StoreContext } from '../context/StoreContext.jsx';
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import AOS from "aos";
import "aos/dist/aos.css";


const PlaceOrder = () => {
	const navigate = useNavigate();
	const style = 'p-1 px-2 placeholder:text-gray-200 bg-white/10 focus:outline-none border-2 border-green-500 focus:border-yellow-100 focus:border-b-yellow-300 focus:border-r-yellow-300  rounded-md focus:bg-green-900 focus:shadow-md focus:shadow-green-950 text-gray-100 w-full';
	const { cartItems, food_list, removeFromCart, getTotalCartAmount, token , url, totalAmt, setTotalAmt, discount} = useContext(StoreContext);
  const deliveryFee = 20 ;
	const [formData,setFormData] = useState({
		firstName:"",
		lastName:"",
		email:"",
		street:"",
		city:"",
		state:"",
		zipcode:"",
		country:"",
		phone:""
	})


	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setFormData(prev=>({...prev,[name]:value}))
	}
	
	const placeOrder = async (event) => {
	  event.preventDefault();
	  setTotalAmt(totalAmt+deliveryFee);
	  let orderItems = food_list
	    .filter((item) => cartItems[item._id] > 0) // Only keep items that are in the cart
	    .map((item) => ({
	      ...item, // Spread existing item data
	      quantity: cartItems[item._id], // Add quantity
	    }));

	  let orderData = {
	    address: formData,
	    items: orderItems,
	    amount: {
	    	subTotal:getTotalCartAmount(),
	    	discount:discount,
	    	deliveryFee:deliveryFee,
	    	totalAmount:totalAmt+deliveryFee
	    },
	  };

	  try {
	    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
	    if (response.data.success) {
	      navigate("/payment");
	    } else {
	      alert("Error placing order.");
	    }
	  } catch (error) {
	    console.error("Order placement error:", error);
	    alert("Something went wrong.");
	  }
	}

	useEffect(()=>{
		if(!token){
			navigate("/cart");
		}
		else if(getTotalCartAmount()<1){
			navigate("/cart");
		}
	},[token]);

	return (
		<div data-aos="flip-right" data-aos-duration="500" data-aos-offset="10" 
		className={`bg-gradient-to-br from-green-950 via-green-900 to-green-900 min-h-screen px-4  lg:px-24 py-8`} id="order">
			<form onSubmit={(event)=>{event.preventDefault(); placeOrder(event); navigate("/payment")}} className={`md:flex lg:flex justify-between items-center space-y-4 gap-4 lg:gap-12 bg-transparent md:bg-gradient-to-br lg:bg-gradient-to-br from-green-900 via-green-800 to-green-800 w-full md:p-4 lg:p-8 md:rounded-xl lg:rounded-2xl md:shadow-md lg:shadow-md shadow-green-950`}>
				<div className={`flex flex-col justify-evenly items-start gap-4 lg:gap-8 w-full`}>
					<h1 className={`pb-2 font-f text-3xl  md:text-4xl lg:text-5xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-500 [text-shadow:10px_10px_20px_rgba(0,0,0,0.2)]`}>Delivery Information</h1>
					<div className={`flex justify-between space-x-4 w-full`}>
						<input required onChange={onChangeHandler} value={formData.firstName} type="text" name="firstName" placeholder="First Name" className={`${style}`} />
						<input required onChange={onChangeHandler} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" className={`${style}`} />
						
					</div>
					<input required onChange={onChangeHandler} value={formData.email} type="text" name="email" placeholder="Email address" className={`${style}`} />
					<input required onChange={onChangeHandler} value={formData.street} type="text" name="street" placeholder="Street" className={`${style}`} />
						
				<div className={`flex justify-between space-x-4 w-full`}>
					<input required onChange={onChangeHandler} value={formData.city} type="text" name="city" placeholder="City" className={`${style}`} />
					<input required onChange={onChangeHandler} value={formData.state} type="text" name="state" placeholder="State" className={`${style}`} />		
				</div>

				<div className={`flex justify-between space-x-4 w-full`}>
					<input required onChange={onChangeHandler} value={formData.zipcode} type="text" name="zipcode" placeholder="Zip code" className={`${style}`} />
					<input required onChange={onChangeHandler} value={formData.country} type="text" name="country" placeholder="Country" className={`${style}`} />		
				</div>
				<input required onChange={onChangeHandler} value={formData.phone} type="text" name="phone" placeholder="Phone" className={`${style}`} />
				</div>

					<div className={`flex flex-col justify-center items-center w-full md:w-3/5 lg:w-2/5`}>
        
          <div className={`-mb-8 lg:-mb-2 md:-mb-2 h-24 w-48 md:h-16 md:w-32 lg:h-24 lg:w-48 border-t-4 border-r-4 border-l-4 border-l-yellow-200 border-t-yellow-300 border-r-yellow-400 rounded-t-full`}></div>
				
				<div className="flex flex-col relative w-full text-gray-200 text-xs md:text-base lg:text-base mt-6 md:mt-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800 md:bg-green-600 lg:bg-green-600 p-4 rounded-xl shadow-md shadow-green-950">
          <h2 className="text-3xl font-bold mb-4 font-f bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-400 [text-shadow:4px_4px_8px_rgba(0,0,0,0.2)] saturate-150">Cart Totals</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>₹{totalAmt}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total</p>
              <p>₹{(totalAmt+deliveryFee).toFixed(2)}</p>
            </div>
          </div>
          <button type="submit" className="cursor-pointer active:bg-yellow-200 font-e shadow-md shadow-green-950 w-full mt-4 bg-yellow-300 text-green-800 font-semibold py-2 rounded-lg">Proceed to Payment</button>
        </div>
        </div>
			</form>

		</div>
	)
}

export default PlaceOrder;