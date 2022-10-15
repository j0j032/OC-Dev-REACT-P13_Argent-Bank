import React, {useEffect} from 'react'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useMutation, useQuery} from 'react-query'
import {fetchUserProfile, updateUserProfile} from '../../api/apiHandler'
import {selectCurrentToken} from '../../feature/auth/auth.slice'
import Modal from '../Modal/Modal'
import useBoolean from '../../hooks/UseBoolean'

const ProfilePage = () => {
	const token = useSelector(selectCurrentToken)
	const [isToggle, {setFalse, setToggle}] = useBoolean(false)
	const userProfileQueryKey = ['fetchUserProfile']
	const {
		data: user,
		isLoading, refetch, isFetched
	} = useQuery(userProfileQueryKey, () => fetchUserProfile(token))
	
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
	
	const fakedata = {
		'firstName': 'Tony',
		'lastName': 'Stark'
	}
	
	const {isLoading: isUpdating, mutate} = useMutation(async (e) => {
		e.preventDefault()
		setFalse()
		await updateUserProfile(fakedata, token)
		refetch()
	})
	if (isUpdating) {
		return <div>LOADING</div>
	}
	
	const editModal = (
		<>
			{isFetched && (
				<Modal>
					<button onClick={setFalse}>FERMER</button>
					<form onSubmit={mutate}>
						<label htmlFor='firstName'>First name:</label>
						<input id='firstName' type='text' defaultValue={user.firstName}/>
						<label htmlFor='lastName'>Last name:</label>
						<input id='lastName' type='text' defaultValue={user.lastName}/>
						<button type='submit' disabled={isUpdating}>VALIDER</button>
					</form>
				</Modal>
			)}
		</>
	)
	
	return (
		<>
			{isLoading ? (<p>Loading...</p>) : (
				<>
					<Header user={user.firstName}/>
					<main className='profile__mainContainer'>
						<div className='profile__header'>
							<h1>Welcome back <br/>{`${user.firstName} ${user.lastName} !`}</h1>
							<button onClick={setToggle} className='profile__btn'>Edit Name</button>
							{isToggle && editModal}
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
