import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useQuery} from 'react-query'
import {fetchUserProfile} from '../../api/apiHandler'

const ProfilePage = () => {
	const accessToken = useSelector(state => state.user.userToken.payload)
	
	const userProfileQueryKey = ['fetchUserProfile']
	const {
		data: user,
		isLoading
	} = useQuery(userProfileQueryKey, () => fetchUserProfile(accessToken), {
		staleTime: 50000,
		retry: 1,
		refetchOnWindowFocus: false,
		refetchOnmount: false,
		refetchOnReconnect: false
	})
	console.log(user)
	
	const transactions = [
		{
			type: 'Argent Bank Checking (x8349)',
			amount: '2,082.79',
			balance: 'Available'
		},
		{
			type: 'Argent Bank Savings (x6712)',
			amount: '10,928.42',
			balance: 'Available'
		},
		{
			type: 'Argent Bank Checking (x8349)',
			amount: '184.30',
			balance: 'Current'
		}
	]
	
	return (
		<>
			{isLoading ? (<p>Loading...</p>) : (
				<>
					<Header user={user.firstName}/>
					<main className='profile__mainContainer'>
						<div className='profile__header'>
							<h1>Welcome back <br/>{user.firstName + user.lastName}</h1>
							<button className='profile__btn'>Edit Name</button>
						</div>
						{
							transactions.map((transaction, i) => (
								<div key={i} className='profile__transactionCtn'>
									<div>
										<p>{transaction.type}</p>
										<p>{transaction.amount}</p>
										<p>{transaction.balance}</p>
									</div>
									<button className='profile__btn'>View transactions</button>
								</div>
							))
						}
					</main>
				</>
			)}
			
			<Footer/>
		</>
	)
}

export default ProfilePage
