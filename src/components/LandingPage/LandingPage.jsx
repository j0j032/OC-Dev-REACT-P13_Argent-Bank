import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import BannerLanding from '../BannerLanding/BannerLanding'
import Argument from '../Argument/Argument'

const LandingPage = () => {
	return (
		<>
		<Header/>
		<main>
			<BannerLanding/>
			<div className='arguments-container'>
				<Argument/>
				<Argument/>
				<Argument/>
			</div>
		</main>
		<Footer/>
		</>
	)
}

export default LandingPage
