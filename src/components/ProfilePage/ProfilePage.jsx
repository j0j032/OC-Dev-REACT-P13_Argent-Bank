import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useMutation, useQuery} from 'react-query'
import {fetchUserProfile, updateUserProfile} from '../../api/apiHandler'
import {selectCurrentToken} from '../../feature/auth/auth.slice'
import Modal from '../Modal/Modal'
import useBoolean from '../../hooks/useBoolean'
import Accounts from '../Accounts/Accounts'


const ProfilePage = () => {
	const token = useSelector(selectCurrentToken)
	const [isToggle, {setFalse, setToggle}] = useBoolean(false)
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	
	
	const {
		data: user,
		isLoading,
		refetch,
		isFetched
	} = useQuery(['fetchUserProfile'], () => fetchUserProfile(token))
	
	const {
		isLoading: isUpdating,
		mutate,
		isError: isUpdateError,
		isSuccess: isUpdateSuccess
	} = useMutation(async (e) => {
		e.preventDefault()
		const newUserData = {
			'firstName': firstName?.length > 0 ? firstName : user.firstName,
			'lastName': lastName?.length > 0 ? lastName : user.lastName
		}
		setFalse()
		await updateUserProfile(newUserData, token)
		await refetch()
	})
	
	if (isUpdating) {
		return <div>UPDATING</div>
	}
	
	const editModal = (
		<>
			{isFetched && (
				<Modal>
					<section className='modal__updateNames'>
						<button onClick={setFalse}>X</button>
						<form onSubmit={mutate}>
							<div>
								<label htmlFor='firstName'>First name:</label>
								<input onChange={(e) => setFirstName(e.target.value)} id='firstName'
								       autoFocus={true} type='text'
								       defaultValue={user.firstName}/>
							</div>
							<div>
								<label htmlFor='lastName'>Last name:</label>
								<input onChange={(e) => setLastName(e.target.value)} id='lastName'
								       type='text' defaultValue={user.lastName}/>
							</div>
							<button className='profile__btn' type='submit'>VALIDER</button>
						</form>
					</section>
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
							{isUpdateError && (<p>Oups, il y a eu un problème !</p>)}
							{isUpdateSuccess && (<p>{'Votre nom à été mis à jour !'}</p>)}
						</div>
						<Accounts/>
					</main>
				</>
			)}
			<Footer/>
		</>
	)
}


export default ProfilePage
