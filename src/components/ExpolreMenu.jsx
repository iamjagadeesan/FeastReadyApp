import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {menuList} from '../assets/frontend_assets/assets';
import AOS from "aos";
import "aos/dist/aos.css";


const ExpolreMenu = ({category,setCategory}) => {
	return (
		<div id="menu" className={`bg-gradient-to-br from-green-900 via-green-800 to-green-800 lg:px-24 xl:px-32 w-full pb-2`}>
		<h2 className={`z-10 w-max -mb-4 p-4 font-f text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-yellow-300 to-yellow-500 [text-shadow:10px_10px_20px_rgba(0,0,0,0.2)]`}>Explore our Menu</h2>
		<p className={`z-10 md:w-3/4 lg:w-3/4 text-gray-200 text-sm md:text-md lg:text-lg p-4 font-e`}>Choose from a diverse menu featuring a deletable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
      <div className={`w-full flex justify-end items-center -mt-8`}>
      <MdOutlineKeyboardDoubleArrowRight  
			      onClick={() => {
			  const menuListBottom = document.getElementById("menuListBottom");
			  if (menuListBottom) {
			    menuListBottom.scrollIntoView({
			      left: menuListBottom.offsetLeft,  // Scrolls only in the X-axis
			      behavior: "smooth",
			      block:"nearest"
			    });
			  }
			}}
      className={`cursor-pointer hover:scale-110 active:scale-90 text-4xl text-yellow-300`}/></div>
			<div className="curstom-scrollbar lg:pb-2 flex flex-row justify-between items-center gap-4 overflow-x-auto scroll-smooth  px-4">
  {menuList.map((items, index) => (
    <div onClick={()=>{setCategory(pre=>pre===items.menuName?"All":items.menuName);document.getElementById("menu").scrollIntoView({behavior:"smooth",block:"start"});}} key={index} className="relative cursor-pointer flex flex-col justify-center items-center text-sm md:text-md lg:text-lg text-center">
      <div data-aos="fade-left" data-aos-duration="300" data-aos-offset="10" data-aos-delay={`${index*100}`}
      	{...(menuList.length-1 === index ? { id: "menuListBottom" } : {})}
        style={{ backgroundImage: `url(${items.menuImg})` }}
        
        className={`size-20 md:size-24 lg:size-24 rounded-full bg-cover bg-center ${category===items.menuName?'border-yellow-300 shadow-lg shadow-green-950 border-4':'border-green-400 border-2'}`}
      ></div>
      <p className={`text-nowrap font-medium font-e text-sm md:text-md lg:text-lg ${category===items.menuName?'text-yellow-300':'text-gray-200'}`}>{items.menuName}</p>
    </div>
  ))}
</div>

		</div>
	)
}

export default ExpolreMenu;