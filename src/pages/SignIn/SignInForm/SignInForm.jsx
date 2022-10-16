import {useQuery} from 'react-query'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../../hooks/useBoolean'
import {setCredentials} from '../../../feature/auth.slice'
import {login} from '../../../api/identification.requests'

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
	
	const tokenQueryKey = ['signIn', email, password]
	const tokenQuery = useQuery(tokenQueryKey, () => login({email, password}), {
		staleTime: 50000,
		cacheTime: 0
	})
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (tokenQuery.data) {
			dispatch(setCredentials({user: email, accessToken: tokenQuery.data}))
			setEmail('')
			setPassword('')
			navigate(`/profile`)
		} else if (tokenQuery.isSuccess === false) {
			setErrMsg('forgot email/password ?')
		}
		console.log(tokenQuery)
	}
	
	
	return (
		<>
			<form onSubmit={handleSubmit} className='signin__form'>
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
			<p ref={errRef}
			   className={errMsg ? 'signin__error' : 'offScreen'}
			   aria-live='assertive'
			>{errMsg}</p>
		</>
	)
}

export default SignInForm
