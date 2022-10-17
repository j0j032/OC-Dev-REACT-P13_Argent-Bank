import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import {useMutation, useQuery} from 'react-query'
import {selectCurrentToken} from '../../feature/auth.slice'
import Modal from '../../components/Modal/Modal'
import useBoolean from '../../hooks/useBoolean'
import Accounts from './Accounts/Accounts'
import {getUserProfile, updateUserProfile} from '../../api/profile.requests'
import Error404 from '../Error404/Error404'
import Loader from '../../components/Loader/Loader'
import useNotification from '../../hooks/useNotification'


const Profile = () => {
	const token = useSelector(selectCurrentToken)
	const [isToggle, {setFalse, setToggle}] = useBoolean(false)
	const [firstName, setFirstName] = useState()
	const [lastName, setLastName] = useState()
	
	const {
		data: user,
		isLoading: isLoadingUserData,
		refetch: updateUserData,
		isFetched: userDataIsFetched,
		isError: userDataError
	} = useQuery(['fetchUserProfile'], () => getUserProfile(token))
	
	const {
		isLoading: isUpdating,
		mutate: editUserData,
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
		await updateUserData()
	})
	
	const notifError = useNotification(isUpdateError)
	const notifUpdated = useNotification(isUpdateSuccess)
	
	if (isUpdating) {
		return <Loader/>
	}
	if (userDataError) {
		return <Error404/>
	}
	
	const editModal = (
		<>
			{userDataIsFetched && (
				<Modal>
					<section className='modal__updateNames'>
						<button onClick={setFalse}>X</button>
						<form onSubmit={editUserData}>
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
			{isLoadingUserData ? (<Loader/>) : (
				<>
					<Header user={user.firstName}/>
					<main className='profile__mainContainer'>
						<div className='profile__header'>
							<h1>Welcome back <br/>{`${user.firstName} ${user.lastName} !`}</h1>
							<button onClick={setToggle} className='profile__btn'>Edit Name</button>
							{isToggle && editModal}
							{notifUpdated && (<p className='notif__update'>✨ Updated !</p>)}
							{notifError && (
								<p className='notif__update notif-error'>⚠️ update failed</p>)}
						</div>
						<Accounts/>
					</main>
				</>
			)}
			<Footer/>
		</>
	)
}


export default Profile

