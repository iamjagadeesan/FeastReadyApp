import React,{useState, useEffect, useContext} from 'react'
import Logo from '../assets/logo.png';
import { IoIosPerson } from "react-icons/io";
import { FaPersonWalking } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { BsFillBasket3Fill } from "react-icons/bs";
import { BsBasket3 } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { StoreContext } from "../context/StoreContext.jsx";
import { Link, useMatch, useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import Search from './Search.jsx';
import { toast } from 'react-toastify';


const Navbar = () => {

	const {menu,setMenu,cartItems, basket, ToView, TopView, token, setToken, cartCount, setShowLogin, searchMode, setSearchMode} = useContext (StoreContext);
	const isHome = useMatch('/');
	const isPayment = useMatch('/payment');
	const navigate = useNavigate();
	const [showOption,setShowOption] = useState(false);
	const logout = () => {
		setShowOption(false);
		setToken("");
		navigate("/");
		toast.success("logout Successfully",{
      position: "top-center",
      autoClose: 2000,
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
	}
	const orders = () => {
		navigate("/orders");
		setShowOption(false);
	}
	
	return (
		<div className={`relative sticky inset-0 top-0 z-40`}>
					{showOption && 
					<ul data-aos="fade-left" data-aos-duration="300"
					className={`absolute top-16 right-1 z-50 md:top-16 md:right-0 lg:top-18 lg:right-32 text-yellow-300 text-xl md:text-lg lg:text-lg bg-green-900 px-3 py-4 space-y-4 rounded-b-lg rounded-l-lg border-2 font-e font-medium border-t-yellow-200 border-l-yellow-200 border-r-yellow-300 border-b-yellow-300 shadow-lg shadow-green-950`}>
						<li onClick={orders} className={`cursor-pointer flex justify-center items-center gap-2 w-full bg-green-800 p-1 rounded-sm shadow-md shadow-green-950 border-b-1 border-transparent hover:border-yellow-300`}><LuShoppingBag/><p>Orders</p></li>
						<li onClick={logout} className={`cursor-pointer flex justify-center items-center gap-1 w-full bg-green-800 p-1 rounded-sm shadow-md shadow-green-950 border-b-1 border-transparent hover:border-yellow-300`}><FaPersonWalking/><p>Logout</p></li>
					</ul> }
		<div className={`overflow-hidden relative lg:px-24 xl:px-32 flex justify-between items-center bg-green-950 px-4 py-1 font-e w-full`} id="top">
			<Link data-aos="fade-right" to="/" onClick={()=>TopView()} ><img src={Logo} className={`h-12 md:h-14 lg:h-16 [filter:drop-shadow(3px_3px_6px_rgba(0,0,0,0.8))]`} alt="Logo"/></Link>
			<ul data-aos="fade-up" className={` ${ isHome ? 'hidden md:inline-flex lg:inline-flex' : 'hidden' } cursor-pointer flex justify-evenly items-center gap-2 lg:gap-8 font-medium text-lg md:text-md lg:text-lg text-yellow-300 capitalize `}>
				<li onClick={()=>{setMenu('home');ToView('home');}}className={`${menu=='home'?'bg-gradient-to-r from-green-600 to-green-800':''} py-1 px-2 rounded-lg`}><p className={`font-e font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500`}>home</p></li>
				<li onClick={()=>{setMenu('menu');ToView('menu');}}className={`${menu=='menu'?'bg-gradient-to-r from-green-600 to-green-800':''} py-1 px-2 rounded-lg`}><p className={`font-e font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500`}>menu</p></li>
				<li onClick={()=>{setMenu('mobile-app');ToView('app-download');}}className={`${menu=='mobile-app'?'bg-gradient-to-r from-green-600 to-green-800':''} py-1 px-2 rounded-lg`}><p className={`font-e font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500`}>mobile-app</p></li>
				<li onClick={()=>{setMenu('contact-us');ToView('contact-us');}}className={`${menu=='contact-us'?'bg-gradient-to-r from-green-600 to-green-800':''} py-1 px-2 rounded-lg`}><p className={`font-e font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500`}>contact us</p></li>
			</ul>
			<div data-aos="fade-left" className={` ${ !isPayment ? 'md:inline-flex lg:inline-flex' : 'hidden' } relative cursor-pointer flex justify-evenly items-center gap-4 lg:gap-8 font-light text-xl text-yellow-300`}>
				<Link><Search/></Link>
				<Link to="/cart" onClick={()=>TopView()} className={` ${!searchMode?'block':'hidden md:hidden lg:block'} relative p-1 text-2xl`}>
				    {cartCount>0 ? <BsFillBasket3Fill className="text-green-500"/> : <BsBasket3/>}
				    {cartCount>0 && <div className="absolute top-0 right-0  bg-green-500  h-4 w-4 -translate-y-2 translate-x-2 text-center text-xs text-black font-bold rounded-full">{cartCount}</div>}
				</Link>
				{ !token
				?<button onClick={()=>setShowLogin(true)} className={`${!searchMode?'block':'hidden md:hidden lg:block'} hover:bg-gradient-to-br hover:from-yellow-100 hover:to-yellow-500 hover:text-green-950 cursor-pointer font-semibold py-1 px-2 border-2 border-b-yellow-400 border-r-yellow-400 border-t-yellow-100 border-l-yellow-100 rounded-lg text-lg text-yellow-300 transition duration-400`}>Sign in</button>
				:
				<div onClick={()=>{setShowOption(prev=>!prev)}} className={`${!searchMode?'block':'hidden md:hidden lg:block'} option relative hover:bg-gradient-to-br from-yellow-100 to-yellow-300  hover:text-green-900 cursor-pointer text-3xl border-2 border-t-yellow-100 border-l-yellow-100 border-r-yellow-300 border-b-yellow-300 rounded-lg transition duration-300 ${showOption?'text-green-900 bg-gradient-to-r':''}`}>
					<IoIosPerson/>
				</div>
				}	
			</div>
		</div>
		<div className={`h-[2px] w-full bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-600`}></div>
		</div>
	)
}

export default Navbar; 
