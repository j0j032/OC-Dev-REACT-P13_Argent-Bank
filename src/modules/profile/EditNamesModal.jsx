import React from 'react'
import useFormX from '../../hooks/useFormX'
import useBoolean from '../../hooks/useBoolean'
import useNotification from '../../hooks/useNotification'
import Modal from '../commons/components/Modal/Modal'
import {useMutation, useQueryClient} from 'react-query'
import {updateUserNames} from '../../api/profile.requests'
import Loader from '../commons/components/Loader/Loader'
import {delayedBoolean} from '../../utils/delayedBoolean'

const EditNamesModal = ({dataIsFetched, userData, setUser, closeModal, handleUpdate, token}) => {
	
	const queryClient = useQueryClient()
	const [errorSwitch, {setFalse: turnErrorOff, setTrue: turnErrorOn}] = useBoolean(false)
	const notifError = useNotification(errorSwitch, 3000)
	
	const handleValidationRequest = () => {
		if (firstName.length > 0 && lastName.length > 0) {
			closeModal()
			setUser(firstName)
		} else {
			delayedBoolean(turnErrorOn, turnErrorOff, 200)
			queryClient.setQueryData(['userInfos'], () => {return userData})
		}
	}
	
	const {
		error: serverError,
		mutate: editUserData,
		isLoading: isUpdating
	} = useMutation(async (data) => {
		await updateUserNames(data, token)
		await handleUpdate()
	}, {
		onError: () => delayedBoolean(turnErrorOn, turnErrorOff, 200),
		onSuccess: () => handleValidationRequest()
	})
	
	const errMsg = serverError ? 'Server Error' : 'Fields are not correctly field'
	
	const {formData, handleInputChange, handleSubmit} = useFormX({
			firstName: dataIsFetched ? userData.firstName : '',
			lastName: dataIsFetched ? userData.lastName : ''
		},
		(formData) => editUserData(formData)
	)
	const {firstName, lastName} = formData
	
	return isUpdating ? (<Loader/>) : (
		<Modal>
			<section className='modal__updateNames'>
				<button onClick={closeModal}>X</button>
				<form onSubmit={handleSubmit}>
					<div>
						<label htmlFor='firstName'>First name:</label>
						<input type='text'
						       id='firstName'
						       name='firstName'
						       autoFocus={true}
						       value={firstName}
						       onChange={handleInputChange}/>
					</div>
					<div>
						<label htmlFor='lastName'>Last name:</label>
						<input type='text'
						       id='lastName'
						       name='lastName'
						       value={lastName}
						       onChange={handleInputChange}/>
					</div>
					<button className='profile__btn' type='submit'>VALIDER</button>
				</form>
			</section>
			{notifError && (<p className='notif__update notif-error'>{`⚠️ ${errMsg}`}</p>)}
		</Modal>
	)
}

export default EditNamesModal
