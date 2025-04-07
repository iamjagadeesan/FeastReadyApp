import React from 'react'
import {assets} from '../assets/frontend_assets/assets'

const AppDownload = () => {
	return (
		<div id="app-download" className={`bg-gradient-to-br from-green-900 via-green-900 to-green-950 flex flex-col justify-center items-center gap-4 p-8 md:p-8 lg:p-12`}>
			<p className={`p-1 text-center text-3xl md:text-3xl lg:text-4xl font-bold font-f bg-clip-text text-transparent bg-gradient-to-br from-gray-200 via-yellow-300 to-yellow-600`}>For Better Experience Download <br/> FeastReady App</p>
			<div className={`flex flex-col md:flex-row lg:flex-row gap-8`}>
				<img src={assets.play_store} alt="Play Store" className={`cursor-pointer lg:hover:scale-110 border-2 lg:hover:border-white border-transparent rounded-2xl transition duration-200`}/>
				<img src={assets.app_store} alt="App Store" className={`cursor-pointer lg:hover:scale-110 border-2 lg:hover:border-white border-transparent rounded-2xl transition duration-200`}/>
			</div>
		</div>
	)
}

export default AppDownload;