import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useQuery} from 'react-query'
import {fetchUserProfile} from '../../api/apiHandler'
import {selectCurrentToken, selectCurrentUser} from '../../feature/auth/auth.slice'

const ProfilePage = () => {
	const usR = useSelector(selectCurrentUser)
	const token = useSelector(selectCurrentToken)
	console.log(usR, token)
	
	const userProfileQueryKey = ['fetchUserProfile']
	const {
		data: user,
		isLoading
	} = useQuery(userProfileQueryKey, () => fetchUserProfile(token), {
		staleTime: 50000,
		retry: 1,
		refetchOnWindowFocus: false,
		refetchOnmount: false,
		refetchOnReconnect: false
	})
	console.log(user)
	
	const accounts = [
		{
			title: 'Checking (x8349)',
			amount: '2,082.79',
			description: 'Available'
		},
		{
			title: 'Savings (x6712)',
			amount: '10,928.42',
			description: 'Available'
		},
		{
			title: 'Checking (x8349)',
			amount: '184.30',
			description: 'Current'
		}
	]
	
	return (
		<>
			{isLoading ? (<p>Loading...</p>) : (
				<>
					<Header user={user.firstName}/>
					<main className='profile__mainContainer'>
						<div className='profile__header'>
							<h1>Welcome back <br/>{`${user.firstName} ${user.lastName} !`}</h1>
							<button className='profile__btn'>Edit Name</button>
						</div>
						<section className='profile__accounts'>
							{
								accounts.map((account, i) => (
									<div key={i} className='profile__account-card'>
										<div className='account'>
											<h3 className='account__title'>{`Argent Bank ${account.title}`}</h3>
											<p className='account__amount'>{`$${account.amount}`}</p>
											<p className='account__description'>{`${account.description} Balance`}</p>
										</div>
										<button className='profile__btn account__btn'>
											View transactions
										</button>
									</div>
								))
							}
						</section>
					</main>
				</>
			)}
			<Footer/>
		</>
	)
}

export default ProfilePage
