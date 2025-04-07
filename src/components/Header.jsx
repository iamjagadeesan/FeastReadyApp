import React,{useContext} from 'react'
import HeaderImg from '../assets/frontend_assets/header_img.png'
import { StoreContext } from "../context/StoreContext.jsx";
import vegMeals from "../assets/vegMeals.png"
import nonVegMeals from "../assets/nonVegMeals.png"
import welcomeMan from "../assets/welcomeMan.png"
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
	const {ToView} = useContext (StoreContext);
	return (
		<div id="home" className={`group flex justify-center items-center lg:py-4 lg:px-24 xl:px-32 bg-gradient-to-br from-green-950 via-green-900 to-green-900`}>
			<div  
			className={` relative bg-contain bg-center h-[70vh] md:h-[75vh] lg:h-[75vh] w-full lg:rounded-xl flex flex-col justify-start md:justify-end lg:justify-end items-start overflow-hidden lg:shadow-lg lg:shadow-green-950 bg-leaf`} >
			 {/*<div className={`absolute  z-0 top-0  w-full h-full flex justify-center items-center`}>
			 	<img src={nonVegMeals} className={`relative -translate-y-0 w-3/4 h-full`}/>
			 </div>*/}
			 <img data-aos="fade-left" data-aos-duration="700" data-aos-offset="10" data-aos-delay="800" src={welcomeMan} alt="Welcoming Man" className={`absolute right-0 bottom-0 z-10 h-2/5 md:h-1/2 lg:h-2/3`}/>
				<div
				className={`absolute z-0 w-full h-full bg-gradient-to-b from-transparent to-green-950/80`}></div>
				<h2 data-aos="fade" data-aos-duration="700" data-aos-offset="10" data-aos-delay="800" className={`z-10 -mb-4 p-4 pb-0 md:pb-4 lg:pb-4 font-f text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-400 to-orange-400 w-3/4 lg:w-2/5 [text-shadow:10px_10px_20px_rgba(0,0,0,0.2)]`}>Order your favourite food here</h2>
				<p data-aos="fade" data-aos-duration="700" data-aos-offset="10" data-aos-delay="800" className={`z-10 md:w-3/4 lg:w-3/4 text-gray-200 text-sm md:text-md lg:text-lg p-4 font-e`}>Choose from a diverse menu featuring a deletable array of dishes crafted with the finest ingredients and culinary expertise. out mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
				<button data-aos="fade" data-aos-duration="700" data-aos-offset="10" data-aos-delay="800" onClick={()=>ToView('menu')} className={`backdrop-blur z-10 cursor-pointer p-2 text-sm md:text-md lg:text-lg font-semibold text-yellow-300 border-2 border-yellow-300 hover:shadow-md hover:shadow-yellow-300 rounded-lg mx-4 mb-4`}>View Menu</button>
			</div>
		</div>
	)
}

export default Header;