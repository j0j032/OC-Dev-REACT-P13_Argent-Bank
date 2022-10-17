import {useMutation, useQuery} from 'react-query'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../../hooks/useBoolean'
import {setCredentials} from '../../../feature/auth.slice'
import {login} from '../../../api/identification.requests'
import useNotification from '../../../hooks/useNotification'
import useDidMountEffect from '../../../hooks/useDidMountEffect'

const SignInForm = () => {
	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRef = useRef()
	const [isToggle, {setToggle}] = useBoolean(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [allowed, setAllowed] = useState(false)
	const [err400, setErr400] = useState(false)
	const [serverErr, setServerErr] = useState(false)
	const notifSuccess = useNotification(allowed)
	const notifError400 = useNotification(err400)
	const notifServerErr = useNotification(serverErr)
	
	useEffect(() => {
		userRef.current.focus()
	}, [])
	
	
	const tokenQueryKey = ['signIn']
	const {data, refetch, isSuccess, isError, error} = useQuery(tokenQueryKey,
		() => login({email, password}), {enabled: false, retry: false})
	
	const {mutate: handleLogin} = useMutation(async (e) => {
		e.preventDefault()
		await refetch()
	})
	
	const showError = () => {
		if (error.response.status === 400) {
			setErr400(true)
			const timer = setTimeout(() => {
				setErr400(false)
			}, 200)
			return () => {
				clearTimeout(timer)
			}
		} else if (error.response.status > 400) {
			setServerErr(true)
			const timer = setTimeout(() => {
				setServerErr(false)
			}, 200)
			return () => {
				clearTimeout(timer)
			}
		}
	}
	
	const redirect = () => {
		const timer = setTimeout(() => {
			navigate(`/profile`)
		}, 2000)
		return () => {
			clearTimeout(timer)
		}
	}
	
	useDidMountEffect(() => {
		if (isSuccess) setAllowed(true)
		if (isError) {
			console.log(error)
			showError()
		}
	}, [isSuccess, isError])
	
	
	useDidMountEffect(() => {
		dispatch(setCredentials({user: email, accessToken: data}))
		redirect()
	}, [allowed])
	
	
	return (
		<>
			<form onSubmit={handleLogin} className='signin__form'>
				<div className='input__wrapper'>
					<label htmlFor='email'>Email</label>
					<input type='email'
					       id='email'
					       name='email'
					       ref={userRef}
					       autoComplete='off'
					       onChange={(e) => setEmail(e.target.value)}
					       value={email}
					       required
					/>
				</div>
				
				<div className='input__wrapper'>
					<label htmlFor='password'>Password</label>
					<input type='password'
					       id='password'
					       onChange={(e) => setPassword(e.target.value)}
					       value={password}
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
			{notifError400 && (
				<p className='notif__update notif-error'>⚠️ Invalid email/password</p>)}
			{notifServerErr && (
				<p className='notif__update notif-error'>🛠 Sorry, we are having server
				                                         problem, please try again later</p>)}
		</>
	)
}

export default SignInForm
