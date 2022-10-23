import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../commons/components/Header/Header'
import Footer from '../commons/components/Footer/Footer'
import {useMutation, useQuery} from 'react-query'
import {getCurrentState, selectCurrentToken, setCredentials} from '../../feature/auth.slice'
import Modal from '../commons/components/Modal/Modal'
import useBoolean from '../../hooks/useBoolean'
import Accounts from './Accounts/Accounts'
import {getUserProfile, updateUserProfile} from '../../api/profile.requests'
import Error404 from '../Error404/Error404'
import Loader from '../commons/components/Loader/Loader'
import useNotification from '../../hooks/useNotification'
import useDidMountEffect from '../../hooks/useDidMountEffect'

const Profile = () => {
	const dispatch = useDispatch()
	const currentState = useSelector(getCurrentState)
	const token = useSelector(selectCurrentToken) || localStorage.getItem('Token')
	const [modalIsOpen, {setFalse: closeModal, setToggle: toggleModal}] = useBoolean(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	
	// The DB query using useQuery hook from react-query: https://react-query-v3.tanstack.com/reference/useQuery
	const {
		data: user,
		isLoading: isLoadingUserData,
		refetch: updateUserData,
		isFetched: userDataIsFetched,
		isError: userDataError
	} = useQuery(['fetchUserProfile'], () => getUserProfile(token))
	
	const setUser = useCallback((name) => {
		dispatch(setCredentials({...currentState, user: name, accessToken: token}))
		localStorage.setItem('user', name)
	}, [currentState, dispatch, token])
	
	useEffect(() => {
		if (userDataIsFetched) setUser(user.firstName)
	})
	
	// The update func using react-query useMutation hook: https://tanstack.com/query/v4/docs/reference/useMutation
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
		closeModal()
		await updateUserProfile(newUserData, token)
		await updateUserData()
	})
	
	// Hook description in file 'src/hooks/useDidMountEffect.jsx'
	useDidMountEffect(() => {
		setUser(firstName)
	}, [isUpdateSuccess])
	
	// Hook description in file 'src/hooks/useNotification.jsx'
	const notifError = useNotification(isUpdateError, 3000)
	const notifUpdated = useNotification(isUpdateSuccess, 3000)
	
	if (isUpdating) {
		return <Loader/>
	}
	if (userDataError) {
		return <Error404/>
	}
	
	// The modal parent is a reusable component. It displays a fade BG layer and takes children
	const editModal = (
		<>
			{userDataIsFetched && (
				<Modal>
					<section className='modal__updateNames'>
						<button onClick={closeModal}>X</button>
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
					<Header/>
					<main className='profile__mainContainer'>
						<div className='profile__header'>
							<h1>Welcome back <br/>{`${user.firstName} ${user.lastName} !`}</h1>
							<button onClick={toggleModal} className='profile__btn'>Edit Name
							</button>
							{modalIsOpen && editModal}
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

