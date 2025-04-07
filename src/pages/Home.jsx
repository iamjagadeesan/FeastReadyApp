import React,{useState,useContext} from 'react'
import Header from '../components/Header.jsx';
import ExpolreMenu from '../components/ExpolreMenu.jsx';
import FoodDisplay from '../components/FoodDisplay.jsx';
import AppDownload from '../components/AppDownload.jsx';
import Footer from '../components/Footer.jsx';
import {StoreContext} from '../context/StoreContext.jsx'

const Home = () => {
	const {search} = useContext (StoreContext);
	const [category, setCategory] = useState("All");
	return (
		<div>
			{ search =="" &&
			<>
			<Header/>
			<ExpolreMenu category={category} setCategory={setCategory} />
			</>
				}
			<FoodDisplay category={category} />
			<AppDownload/>
			<Footer/>
		</div>
	)
}

export default Home;