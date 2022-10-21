import {useMutation} from 'react-query'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../../hooks/useBoolean'
import {setCredentials} from '../../../feature/auth.slice'
import {login} from '../../../api/identification.requests'
import useNotification from '../../../hooks/useNotification'

const SignInForm = () => {
	
	const [isToggle, {setToggle}] = useBoolean(false)
	const [err, setErr] = useState(false)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const emailRef = useRef()
	const pwdRef = useRef()
	
	useEffect(() => {
		emailRef.current.focus()
	}, [])
	
	
	const redirect = () => {
		const timer = setTimeout(() => {
			navigate(`/profile`)
		}, 2000)
		return () => {
			clearTimeout(timer)
		}
	}
	
	const handleLoginn = useMutation(login, {
		onSuccess: (data) => {
			dispatch(setCredentials({user: emailRef.current.value, accessToken: data}))
			redirect()
			// remember me
			if (isToggle) localStorage.setItem('Token:', data)
		},
		onError: () => showError()
	})
	const notifSuccess = useNotification(handleLoginn.isSuccess)
	const notifError = useNotification(err)
	
	const handleSubmit = e => {
		e.preventDefault()
		handleLoginn.mutate({email: emailRef.current.value, password: pwdRef.current.value})
	}
	
	const showError = () => {
		setErr(true)
		const timer = setTimeout(() => {
			setErr(false)
		}, 200)
		return () => {
			clearTimeout(timer)
		}
	}
	
	
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
					<input onClick={setToggle} defaultChecked={isToggle} type='checkbox'
					       id='remember-me'/>
					<label htmlFor='remember-me'>Remember me</label>
				</div>
				
				<button className='signin__btn'>Sign In</button>
			</form>
			{notifSuccess && (<p className='notif__update'>👋 Welcome back ! </p>)}
			{notifError && (
				<p className='notif__update notif-error'>{`⚠️ ${handleLoginn.error.message ? handleLoginn.error.message : 'An error has occurred'}`}</p>)}
		</>
	)
}

export default SignInForm
