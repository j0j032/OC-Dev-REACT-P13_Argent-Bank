import React, {useCallback, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Header from '../commons/components/Header/Header'
import Footer from '../commons/components/Footer/Footer'
import {useQuery} from 'react-query'
import {getCurrentState, selectCurrentToken, setCredentials} from '../../feature/auth.slice'
import useBoolean from '../../hooks/useBoolean'
import Accounts from './Accounts/Accounts'
import {getUserProfile} from '../../api/profile.requests'
import Error404 from '../error404/Error404'
import Loader from '../commons/components/Loader/Loader'
import useNotification from '../../hooks/useNotification'
import EditNamesModal from './EditNamesModal'

const Profile = () => {
	const dispatch = useDispatch()
	const currentState = useSelector(getCurrentState)
	const token = useSelector(selectCurrentToken)
	const [modalIsOpen, {setFalse: closeModal, setToggle: toggleModal}] = useBoolean(false)
	
	const {
		isLoading,
		isError,
		isFetched,
		data: user,
		isRefetching: isUpdating,
		refetch: handleUpdate
	} = useQuery(['userInfos'], () => getUserProfile(token), {
		staleTime: 120_000,
		retryOnMount: false
	})
	
	const setUser = useCallback((name) => {
		dispatch(setCredentials({...currentState, user: name, accessToken: token}))
	}, [currentState, dispatch, token])
	
	useEffect(() => {
		if (isFetched) setUser(user.firstName)
	})
	
	const notifUpdated = useNotification(isUpdating, 3000)
	
	const editModal = modalIsOpen && (
		<EditNamesModal token={token}
		                userData={user}
		                setUser={setUser}
		                closeModal={closeModal}
		                dataIsFetched={isFetched}
		                handleUpdate={handleUpdate}
		/>
	)
	
	if (isError) {
		return <Error404/>
	}
	
	return isLoading ? (<Loader/>) : (
		<>
			<Header/>
			<main className='profile__mainContainer'>
				<div className='profile__header'>
					<h1>Welcome back <br/>{`${user.firstName} ${user.lastName} !`}</h1>
					<button onClick={toggleModal} className='profile__btn'>Edit Name
					</button>
				</div>
				<Accounts/>
			</main>
			<Footer/>
			{editModal}
			{notifUpdated && (<p className='notif__update'>✨ Updated !</p>)}
		</>
	)
}

export default Profile

