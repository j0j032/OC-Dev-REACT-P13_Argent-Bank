import React from 'react'
import useFormX from '../../hooks/useFormX'

export const EditProfileForm = ({profile, onSubmit}) => {
	
	const {formData, handleInputChange, handleSubmit} = useFormX({
			firstName: profile.firstName,
			lastName: profile.lastName
		},
		(formData) => onSubmit(formData)
	)
	const {firstName, lastName} = formData
	return (
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
	)
}
