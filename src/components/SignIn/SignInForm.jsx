import {useQuery} from 'react-query'
import {logIn} from '../../api/apiHandler'
import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../hooks/UseBoolean'
import {setCredentials} from '../../feature/auth/auth.slice'

const SignInForm = () => {
	
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const userRef = useRef()
	const errRef = useRef()
	const [isToggle, {setToggle}] = useBoolean(false)
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')
	
	useEffect(() => {
		userRef.current.focus()
	}, [])
	
	useEffect(() => {
		setErrMsg('')
	}, [email, pwd])
	
	const tokenQueryKey = ['signIn', email, pwd]
	const tokenQuery = useQuery(tokenQueryKey, () => logIn(email, pwd), {
		staleTime: 50000,
		cacheTime: 0
	})
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		if (tokenQuery.data) {
			dispatch(setCredentials({user: email, accessToken: tokenQuery.data}))
			setEmail('')
			setPwd('')
			navigate(`/profile`)
		} else {
			setErrMsg('Identifiants incorrects')
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
					       onChange={(e) => setPwd(e.target.value)}
					       value={pwd}
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
