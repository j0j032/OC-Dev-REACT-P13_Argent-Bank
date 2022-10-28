import React from 'react'
import Header from '../commons/components/Header/Header'
import Footer from '../commons/components/Footer/Footer'
import BannerLanding from './BannerLanding/BannerLanding'
import Argument from './Argument/Argument'
import {useGetProfile} from '../../api/useGetProfile'
import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../../feature/auth.slice'


const Landing = () => {
	
	const token = useSelector(selectCurrentToken)
	const {status, data: user} = useGetProfile(token, {enabled: false})
	
	return (
		<>
			<Header firstName={status === 'success' && user.firstName}/>
			<main>
				<BannerLanding/>
				<Argument/>
			</main>
			<Footer/>
		</>
	)
}

export default Landing
