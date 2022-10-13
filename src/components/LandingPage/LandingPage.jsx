import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BannerLanding from '../BannerLanding/BannerLanding'
import Argument from '../Argument/Argument'


const LandingPage = () => {
	
	return (
		<>
			<Header user={''}/>
			<main>
				<BannerLanding/>
				<Argument/>
			</main>
			<Footer/>
		</>
	)
}

export default LandingPage
