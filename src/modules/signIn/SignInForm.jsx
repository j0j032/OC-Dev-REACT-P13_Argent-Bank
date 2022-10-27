import {useMutation} from 'react-query'
import React, {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../hooks/useBoolean'
import {setCredentials} from '../../feature/auth.slice'
import {login} from '../../api/identification.requests'
import useNotification from '../../hooks/useNotification'
import useFormX from '../../hooks/useFormX'
import {delayedBoolean} from '../../utils/delayedBoolean'

const SignInForm = () => {
	const emailRef = useRef()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [rememberSwitch, {setToggle: toggleRemember}] = useBoolean(false)
	const [errorSwitch, {setFalse: turnErrorOff, setTrue: turnErrorOn}] = useBoolean(false)
	
	const {formData, handleInputChange, handleSubmit} = useFormX({email: '', password: ''},
		(formData) => connection.mutate(formData)
	)
	const {email, password} = formData
	
	// set the focus on render
	useEffect(() => {
		emailRef.current.focus()
	}, [])
	
	// Navigate with a delay to show success notification
	const redirect = () => {
		const timer = setTimeout(() => {
			navigate(`/profile`)
		}, 2000)
		return () => {
			clearTimeout(timer)
		}
	}
	
	function handleLogin(identifier) {
		dispatch(setCredentials({accessToken: identifier}))
		redirect()
	}
	
	const connection = useMutation(login, {
		onSuccess: (data) => handleLogin(data),
		onError: () => delayedBoolean(turnErrorOn, turnErrorOff, 200)
	})
	
	const notifSuccess = useNotification(connection.isSuccess, 3000)
	const notifError = useNotification(errorSwitch, 3000)
	
	return (
		<>
			<form onSubmit={handleSubmit} className='signin__form'>
				<div className='input__wrapper'>
					<label htmlFor='email'>Email</label>
					<input type='email'
					       name='email'
					       ref={emailRef}
					       value={email}
					       onChange={handleInputChange}
					       autoComplete='off'
					       required
					/>
				</div>
				
				<div className='input__wrapper'>
					<label htmlFor='password'>Password</label>
					<input type='password'
					       name='password'
					       value={password}
					       onChange={handleInputChange}
					       required
					/>
				</div>
				
				<div className='input__remember'>
					<input onClick={toggleRemember} defaultChecked={rememberSwitch} type='checkbox'
					       id='remember-me'/>
					<label htmlFor='remember-me'>Remember me</label>
				</div>
				
				<button className='signin__btn'>Sign In</button>
			</form>
			{notifSuccess && (<p className='notif__update'>👋 Welcome back ! </p>)}
			{notifError && (
				<p className='notif__update notif-error'>{`⚠️ ${connection.error.message ? connection.error.message : 'An error has occurred'}`}</p>)}
		</>
	)
}

export default SignInForm
