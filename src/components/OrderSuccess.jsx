import React,{useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const OrderSuccess = () => {

	 const [orderConfirm,setOrderConfirm] = useState(true);
	 const navigate = useNavigate();

	useEffect(() => {
  document.body.style.overflowY = "hidden";
  const timer = setTimeout(() => {
    setOrderConfirm(false);
    toast.success("Order placed successfully",{
      position: "top-center",
      autoClose: 3000,
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
  }, 3000);

  return () => {
    clearTimeout(timer);
    document.body.style.overflowY = "auto";
  };
}, []);


	return (
			<div className={`absolute inset-0 z-50 min-h-screen w-full backdrop-blur bg-black/20 flex flex-col justify-center items-center space-y-10 animate-fadeIn`}>
		        <div className={`relative flex flex-col justify-center items-center drop-shadow-lg animate-zoom-in delay-400`}>
		          <div className={`absolute inset-0 top-8 m-auto  ${orderConfirm ? 'w-12 h-12 rounded-full border-2 border-t-white border-l-transparent border-b-transparent border-r-transparent animate-spin transition-all duration-300 ': 'h-12 w-7 rotate-[35deg] border-r-4 border-4 border-b-white border-r-white border-t-transparent border-l-transparent transition-all duration-200'} z-50`}></div>
		          <div className={`h-12 w-16 rounded-t-full border-t-4 border-l-4 border-r-4 border-l-yellow-200 border-t-yellow-300 border-r-yellow-400`}></div>
		          <div className={`bag bg-black size-32 bg-gradient-to-br from-green-700 via-green-600 to-green-700 rounded-xl`}></div>
		        </div>
		        <button onClick={()=>{navigate("/orders");setOrderConfirm(false);document.body.style.overflowY="auto";}} className={`cursor-pointer ${!orderConfirm?'animate-zoom-in':'scale-75 opacity-0 transition-all duration-300'} px-2 py-1 bg-gradient-to-br from-green-700 via-green-600 to-green-700 text-gray-100 font-semibold rounded-lg border-2 border-l-yellow-200 border-t-yellow-200 border-r-yellow-300 border-b-yellow-300 shadow-md`}>View Orders</button>
		      </div>
	)
}

export default OrderSuccess;