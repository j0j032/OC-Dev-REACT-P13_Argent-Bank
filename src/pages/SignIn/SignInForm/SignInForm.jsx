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
	const errRef = useRef()
	const [isToggle, {setToggle}] = useBoolean(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errMsg, setErrMsg] = useState('')
	
	
	useEffect(() => {
		userRef.current.focus()
	}, [])
	
	useEffect(() => {
		setErrMsg('')
	}, [email, password])
	
	
	const tokenQueryKey = ['signIn']
	const {data, refetch} = useQuery(tokenQueryKey, () => login({email, password}), {
		enabled: false
	})
	
	const {mutate: handleLogin, isSuccess} = useMutation(async (e) => {
		e.preventDefault()
		await refetch()
	})
	
	const redirect = () => {
		const timer = setTimeout(() => {
			navigate(`/profile`)
		}, 1000)
		return () => {
			clearTimeout(timer)
		}
	}
	
	useDidMountEffect(() => {
		dispatch(setCredentials({user: email, accessToken: data}))
		redirect()
	}, [isSuccess])
	
	
	//const notifError = useNotification(isError)
	
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
			{/*{notifError && (
				<p className='notif__update notif-error'>⚠️ Invalid email/password</p>)}*/}
			<p ref={errRef}
			   className={errMsg ? 'signin__error' : 'offScreen'}
			   aria-live='assertive'
			>{errMsg}</p>
		</>
	)
}

export default SignInForm
