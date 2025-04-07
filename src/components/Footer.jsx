import React from 'react'
import Logo from '../assets/logo.png';
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {

	const Links = [
		{name:'Facebook',link:'',Icon:FaSquareFacebook},
		{name:'Twitter',link:'',Icon:FaSquareXTwitter},
		{name:'Linkedin',link:'',Icon:FaLinkedin}];

	const Navlink = [
		{title:'home',link:'home'},
		{title:'menu',link:'menu'},
		{title:'mobile-app',link:'app-download'},
		{title:'contact-us',link:'contact-us'}
	]

	return (
		<div id="contact-us" className={`p-2 bg-gradient-to-br from-green-900 via-green-950 to-green-950 w-full lg:px-32 lg:py-8`}>
			<div className={`flex flex-col md:flex-row lg:flex-row justify-between items-start gap-12 w-full mb-8`}>
				<div className={`w-full flex flex-col justify-between items-start gap-2 px-4 md:px-2 lg:px-8`}>
					<img src={Logo} alt="Logo" className={`h-20 [filter:drop-shadow(3px_3px_6px_rgba(0,0,0,0.6))]`} />
					<p className={`text-yellow-100 text-sm`}>FeastReady is a seamless and user-friendly food ordering platform that brings your favorite dishes straight to your doorstep. Browse through a diverse menu, explore top-rated dishes, and enjoy a hassle-free ordering experience with our intuitive interface. Your cravings, just a click away!</p>
					<ul className={`flex justify-evenly items-start gap-4`}>
						{Links.map(({name,link,Icon},index)=>(
							<li key={index}><Icon className={`cursor-pointer text-3xl text-yellow-300 hover:scale-110 hover:shadow-md shadow-black rounded-sm`}/></li>))}
					</ul>
				</div>

				<div className={`px-4 md:px-2 lg:px-8`}> 
					<h1 className={`font-bold font-f text-3xl bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-500 w-fit`}>COMPANY</h1>
					<ul className={`pt-4`}>
						{Navlink.map((nav, index) => (
						    <li
						        key={index}
						        onClick={() => {
						            const section = document.getElementById(nav.link);
						            if (section) {
						                section.scrollIntoView({ behavior: "smooth", block:"start" });
						            }
						        }}
						        className="cursor-pointer border-b-2 hover:border-yellow-300 border-transparent py-1 text-md text-yellow-100 font-medium"
						    >
						        {nav.title}
						    </li>
						))}
					</ul>
				</div>

				<div className={`px-4 md:px-2 lg:px-8 text-nowrap`}>
					<h1 className={`font-bold font-f text-3xl bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-500 w-fit`}>GET IN TOUCH</h1>
					<p className={`py-2 text-md font-medium text-yellow-100 cursor-pointer border-b-2 hover:border-yellow-300 border-transparent`}>+91 123-456-7890</p>
				</div>
			</div>
			<p className={`text-yellow-100 font-medium font-e text-xs md:text-sm lg:text-sm w-full text-center py-2`}>{"All rights reserved by FeastReady"} &copy; {new Date().getFullYear()}</p>
		</div>
	)
}

export default Footer;