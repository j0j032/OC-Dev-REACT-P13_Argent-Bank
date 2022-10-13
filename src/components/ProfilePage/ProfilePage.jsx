import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

const ProfilePage = () => {
	const userData = useSelector(state => state.user.userInfo.payload)
	const {firstName, lastName} = userData
	
	const transactions = [
		{
			type: 'Argent Bank Checking (x8349)',
			amount: '2,082.79',
			balance: 'Available'
		},
		{
			type: 'Argent Bank Checking (x8349)',
			amount: '2,082.79',
			balance: 'Available'
		},
		{
			type: 'Argent Bank Checking (x8349)',
			amount: '2,082.79',
			balance: 'Available'
		}
	]
	
	return (
		<>
			<Header user={firstName}/>
			<main className='profile__mainContainer'>
				<div className='profile__header'>
					<h1>Welcome back <br/>{firstName + lastName}</h1>
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
							<button></button>
						</div>
					))
				}
			</main>
			<Footer/>
		</>
	)
}

export default ProfilePage
