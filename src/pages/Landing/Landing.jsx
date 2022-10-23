import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import BannerLanding from './BannerLanding/BannerLanding'
import Argument from './Argument/Argument'


const Landing = () => {
	
	return (
		<>
			<Header/>
			<main>
				<BannerLanding/>
				<Argument/>
			</main>
			<Footer/>
		</>
	)
}

export default Landing
