import React from 'react'
import {useSelector} from 'react-redux'
import Header from '../commons/components/Header/Header'
import Footer from '../commons/components/Footer/Footer'
import {useMutation, useQueryClient} from 'react-query'
import {selectCurrentToken} from '../../feature/auth.slice'
import useBoolean from '../../hooks/useBoolean'
import Accounts from './Accounts/Accounts'
import {updateUserNames} from '../../api/profile.requests'
import Error404 from '../error404/Error404'
import Modal from '../commons/components/Modal/Modal'
import {EditProfileForm} from './EditProfileForm'
import {useProfile} from '../../hooks/useProfile'

const Profile = () => {
	const token = useSelector(selectCurrentToken)
	const [modalIsOpen, {setFalse: closeModal, setToggle: toggleModal}] = useBoolean(false)
	const queryClient = useQueryClient()
	
	console.log('render')
	const {
		isLoading,
		isError,
		data: user
	} = useProfile(token)
	
	const {mutate} = useMutation(async (data) => {
		await updateUserNames(data, token)
	}, {
		onSuccess: () => queryClient.invalidateQueries('profile')
	})
	
	const onSubmit = data => {
		mutate(data)
		closeModal()
	}
	
	const editModal = (
		<Modal>
			<section className='modal__updateNames'>
				<button onClick={closeModal}>X</button>
				{user && <EditProfileForm profile={user} onSubmit={onSubmit}/>}
			</section>
		</Modal>
	)
	
	if (isError) {
		return <Error404/>
	}
	
	return (
		<>
			<Header firstName={isLoading ? 'Loading' : user.firstName}/>
			<main className='profile__mainContainer'>
				<div className='profile__header'>
					<h1>Welcome
					    back <br/>{isLoading ? 'Loading' : `${user.firstName} ${user.lastName} !`}
					</h1>
					<button onClick={toggleModal} className='profile__btn'>Edit Name
					</button>
				</div>
				<Accounts/>
			</main>
			<Footer/>
			{modalIsOpen && user ? editModal : null}
		</>
	)
}

export default Profile

