import React, { useState, useContext } from 'react';
import { MdRestaurantMenu } from "react-icons/md";
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = () => {
  const inputStyle = 'p-1 px-2 placeholder:text-gray-200 w-1/2 focus:outline-none border-2 border-green-600 focus:border-l-yellow-100 focus:border-t-yellow-100 focus:border-b-yellow-300 focus:border-r-yellow-300 rounded-md bg-white/10 focus:bg-green-800 focus:shadow-md focus:shadow-green-950 text-gray-100';
  
  const { url, setToken, setShowLogin } = useContext(StoreContext);
  const [currState, setCurrState] = useState(localStorage.getItem("token") ? "Login" : "Sign Up");

  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {

        toast.success("Successfully Logged in",{
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
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      } else {
        toast.error(response.data.message,{
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
    } catch (error) {
      console.error("Login/Register Error:", error);
      toast.success("Something went Wrong! please try again.",{
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

    setData({ name: '', email: '', password: '' });
  };

  return (
    <div className="absolute inset-0 z-50 backdrop-blur-sm flex justify-center items-center">
      <form onSubmit={onLogin} className="h-3/4 md:h-3/4 md:w-3/5 lg:h-2/3 lg:w-2/5 relative flex flex-col justify-between items-center bg-gradient-to-br from-green-900 via-green-900 to-green-950 border-2 border-l-yellow-200 border-t-yellow-200 border-r-yellow-300 border-b-yellow-300 p-4 rounded-lg shadow-lg shadow-black">
        <div className="relative w-full">
          <h2 className="pb-1 w-max place-self-center font-bold font-f text-center text-3xl bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-500">
            {currState}
          </h2>
          <MdRestaurantMenu className="absolute cursor-pointer text-3xl right-0 top-0 text-green-950" onClick={() => setShowLogin(false)} />
        </div>
        
        <div className="flex flex-col justify-between items-center gap-8 w-full">
          {currState === "Login" ? null : <input name="name" onChange={onChangeHandler} value={data.name} className={inputStyle} type="text" placeholder="Your Name" required />}
          <input name="email" onChange={onChangeHandler} value={data.email} className={inputStyle} type="email" placeholder="Your Email" required />
          <input name="password" onChange={onChangeHandler} value={data.password} className={`tracking-widest ${inputStyle}`} type="password" placeholder="Password" required />
        </div>

        <button type="submit" className="cursor-pointer active:scale-110 text-gray-100 font-medium font-e text-xl border-2 border-l-yellow-200 border-t-yellow-200 border-b-yellow-400 border-r-yellow-400 bg-yellow-300 bg-gradient-to-br from-green-900 via-green-800 to-green-700 p-1 px-2 rounded-lg shadow-md shadow-green-950">
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <label className="flex items-center cursor-pointer space-x-2">
          <input type="checkbox" className="font-checkbox h-6 w-6 text-yellow-300" required />
          <span className="text-gray-200 text-xs md:text-base lg:text-base">
            By continuing, I agree to the terms of use & privacy policy.
          </span>
        </label>

        {currState === "Login" ? (
          <p className="text-gray-200 text-xs md:text-base lg:text-base">
            Create a new Account?{" "}
            <span onClick={() => setCurrState("Sign Up")} className="cursor-pointer underline underline-offset-4 underline-yellow-300 text-yellow-300">
              Click here
            </span>
          </p>
        ) : (
          <p className="text-gray-200 text-xs md:text-base lg:text-base">
            Already have an Account?{" "}
            <span onClick={() => setCurrState("Login")} className="cursor-pointer underline underline-offset-4 underline-yellow-300 text-yellow-300">
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;