import React from 'react'

const Modal = ({defaultFirstName, defaultLastName}) => {
	return (
		<div className='modal__container'>
			<form>
				<label htmlFor='firstName'>First name:</label>
				<input id='firstName' type='text' defaultValue={defaultFirstName}/>
				<label htmlFor='lastName'>Last name:</label>
				<input id='lastName' type='text' defaultValue={defaultLastName}/>
				<button>VALIDER</button>
			</form>
		</div>
	)
}

export default Modal
