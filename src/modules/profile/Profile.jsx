import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../commons/components/Header/Header'
import Footer from '../commons/components/Footer/Footer'
import {selectCurrentToken} from '../../feature/auth.slice'
import useBoolean from '../../hooks/useBoolean'
import Accounts from './Accounts/Accounts'
import Error404 from '../error404/Error404'
import Modal from '../commons/components/Modal/Modal'
import {EditProfileForm} from './EditProfileForm'
import {useGetProfile} from '../../api/useGetProfile'
import {delayedBoolean} from '../../utils/delayedBoolean'
import useNotification from '../../hooks/useNotification'
import {useUpdateProfile} from '../../api/useUpdateProfile'

const Profile = () => {
	const [modalIsOpen, {setFalse: closeModal, setToggle: toggleModal}] = useBoolean(false)
	const [errorSwitch, {setFalse: turnErrorOff, setTrue: turnErrorOn}] = useBoolean(false)
	const token = useSelector(selectCurrentToken)
	
	const {isLoading, isError, data: user} = useGetProfile(token)
	const {mutate, error: serverError, isLoading: isUpdating} = useUpdateProfile(token)
	
	const onSubmit = data => {
		if (data.firstName !== '' && data.lastName !== '' && !serverError) {
			mutate(data)
			closeModal()
		} else {
			delayedBoolean(turnErrorOn, turnErrorOff, 200)
		}
	}
	
	const errMsg = serverError ? 'Server Error' : 'Fields are not correctly field'
	const notifError = useNotification(errorSwitch, 3000)
	const notifUpdated = useNotification(isUpdating, 3000)
	
	
	const editModal = (
		<Modal>
			<section className='modal__updateNames'>
				<button onClick={closeModal}>X</button>
				{user && <EditProfileForm profile={user} onSubmit={onSubmit}/>}
			</section>
			{notifError && (<p className='notif__update notif-error'>{`⚠️ ${errMsg}`}</p>)}
		</Modal>
	)
	
	return isError ? (<Error404/>) : (
		<>
			<Header firstName={isLoading ? null : user.firstName}/>
			<main className='profile__mainContainer'>
				<div className='profile__header'>
					<h1>Welcome back <br/>
						{isLoading ? null : `${user.firstName} ${user.lastName} !`}
					</h1>
					<button onClick={toggleModal} className='profile__btn'>Edit Name
					</button>
				</div>
				<Accounts/>
			</main>
			<Footer/>
			{modalIsOpen ? editModal : null}
			{notifUpdated && (<p className='notif__update'>✨ Updated !</p>)}
		</>
	)
}

export default Profile
