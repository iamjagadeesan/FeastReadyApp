import React, { useState, useContext } from 'react';
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { StoreContext } from "../context/StoreContext.jsx";
import AOS from "aos";
import "aos/dist/aos.css";


const FoodItem = ({ id, name, price, description, image, index }) => {
  
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div data-aos="fade-up" data-aos-duration="300" data-aos-offset="10" data-aos-delay="100" 
    className="group relative cursor-pointer w-[9rem] h-48 md:w-54 md:h-62 lg:w-62 lg:h-72 p-2 bg-gradient-to-br from-green-600 via-green-500 to-green-600 rounded-lg shadow-lg shadow-green-900 flex flex-col justify-between items-center">
      
      {/* Only show count when item is in the cart */}
      {cartItems[id] > 0 && (
        <span className="z-10 absolute top-0 right-0 bg-yellow-300 text-green-950 font-semibold py-0 px-2 translate-x-2 -translate-y-2 rounded-full shadow-md shadow-black">
          {cartItems[id]}
        </span>
      )}
      <div className={`group-hover:scale-[1.07] group-hover:-translate-y-1 transition duration-200 overflow-hidden shadow-lg shadow-green-900  rounded-lg relative h-full w-full h-[50%] md:h-[60%] lg:h-[60%] w-60`}>
      <img
        src={url+"/images/"+image}
        alt={`${name} image`}
        className="w-full h-full bg-gray-200  object-cover"
      />
      <span className={`lg:opacity-0 group-hover:opacity-100 absolute bottom-1 right-2 text-xs text-yellow-300 flex drop-shadow-[0_0_6px_black] transition duration-500`}><IoIosStar/><IoIosStar/><IoIosStar/><IoIosStar/></span>
      </div>

      <div className="flex flex-col justify-between items-center w-full mt-3 md:mt-2 lg:mt-1">
        <div className="flex flex-row justify-between items-center w-full">
          <h2 className="text-md md:text-lg lg:text-lg font-bold leading-4 font-f text-green-950/90">{name}</h2>
          <h2 className="font-b text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-200 to-yellow-400">
            ₹{price}
          </h2>
        </div>
        <p className="text-[.45rem] md:text-xs lg:text-xs text-green-900 font-e font-bold">{description}</p>
      </div>

      {/* Add/Remove from cart */}
      <div className="rounded-full flex flex-row justify-between items-center gap-8 text-yellow-300">
        {cartItems[id] > 0 && (
          <span className="active:scale-110 text-md lg:text-lg" onClick={() => removeFromCart(id)}>
            <FaTrash />
          </span>
        )}
        <span className="active:scale-110 text-lg lg:text-xl" onClick={() => addToCart(id)}>
          <BsFillBasket3Fill />
        </span>
      </div>
    </div>
  );
};

export default FoodItem;
