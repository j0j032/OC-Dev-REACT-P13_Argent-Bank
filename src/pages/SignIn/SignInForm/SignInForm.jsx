import {useMutation} from 'react-query'
import React, {useEffect, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../../hooks/useBoolean'
import {setCredentials} from '../../../feature/auth.slice'
import {login} from '../../../api/identification.requests'
import useNotification from '../../../hooks/useNotification'

const SignInForm = () => {
	
	const [rememberSwitch, {setToggle: toggleRemember}] = useBoolean(false)
	const [errorSwitch, {setFalse: turnErrorOff, setTrue: turnErrorOn}] = useBoolean(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const emailRef = useRef()
	const pwdRef = useRef()
	
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
	
	/**
	 * Actions when user inputs are valid and retrieve in DB
	 * @param {string} identifier - JWT
	 */
	function handleLogin(identifier) {
		dispatch(setCredentials({accessToken: identifier, loggedIn: true}))
		redirect()
		if (rememberSwitch) {
			const userInfos = {Token: identifier, isConnected: 'true'}
			for (const prop in userInfos) localStorage.setItem(prop, userInfos[prop])
		}
	}
	
	/**
	 * To set the errorSwitch to true and back to false in case of another error happen and
	 * need to be notified
	 * @returns {(function(): void)|*}
	 */
	const showError = () => {
		turnErrorOn()
		const timer = setTimeout(() => {
			turnErrorOff()
		}, 200)
		return () => {
			clearTimeout(timer)
		}
	}
	
	// using react-query useMutation hook: https://tanstack.com/query/v4/docs/reference/useMutation
	const connection = useMutation(login, {
		onSuccess: (data) => handleLogin(data),
		onError: () => showError()
	})
	
	
	const handleSubmit = e => {
		e.preventDefault()
		connection.mutate({email: emailRef.current.value, password: pwdRef.current.value})
	}
	
	// Hook description in file 'src/hooks/useNotification.jsx'
	const notifSuccess = useNotification(connection.isSuccess, 3000)
	
	//Listen a boolean in case of multi error in a row
	// (if using connection.isError, notification will display only once)
	const notifError = useNotification(errorSwitch, 3000)
	
	return (
		<>
			<form onSubmit={handleSubmit} className='signin__form'>
				<div className='input__wrapper'>
					<label htmlFor='email'>Email</label>
					<input type='email'
					       id='email'
					       name='email'
					       ref={emailRef}
					       autoComplete='off'
					       required
					/>
				</div>
				
				<div className='input__wrapper'>
					<label htmlFor='password'>Password</label>
					<input type='password'
					       id='password'
					       ref={pwdRef}
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
