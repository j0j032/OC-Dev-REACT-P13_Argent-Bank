import React, {useEffect, useRef, useState} from 'react'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import useBoolean from '../hooks/UseBoolean'
import {useQuery} from 'react-query'
import {fetchUserProfile, logIn} from '../apiHandler'
import useAuth from '../hooks/useAuth'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setUserInfos} from '../feature/user.slice'

const Login = () => {
	const dispatch = useDispatch()
	const {setAuth} = useAuth()
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
		staleTime: 5_000
	})
	
	const userProfileQueryKey = ['fetchUserProfile', tokenQuery.data]
	const userProfileQuery = useQuery(userProfileQueryKey, () => fetchUserProfile(tokenQuery.data || localStorage.getItem('accessToken')))
	
	
	const handleSubmit = async (e) => {
		const {id, firstName, lastName} = userProfileQuery.data
		e.preventDefault()
		if (tokenQuery.data) {
			localStorage.setItem('accessToken', tokenQuery.data)
			setAuth({token: tokenQuery.data})
			dispatch(setUserInfos({email, id, firstName, lastName}))
			setEmail('')
			setPwd('')
			navigate(`/profile/${id}`)
		} else {
			setErrMsg('Identifiants incorrects')
		}
		console.log(tokenQuery)
	}
	
	return (
		<>
			<Header/>
			<main className='main signin__bg-dark'>
				<section className='signin__container'>
					<i className='fa fa-user-circle sign-in-icon'></i>
					<h1>Sign In</h1>
					
					<form onSubmit={handleSubmit} className='signin__form'>
						<div className='input__wrapper'>
							<label htmlFor='email'>Email</label>
							<input type='email'
							       id='email'
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
				
				</section>
			</main>
			<Footer/>
		</>
	)
}

export default Login
