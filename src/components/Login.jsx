import React, {useEffect, useRef, useState, useContext} from 'react'
import AuthContext from '../context/AuthProvider'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import useBoolean from '../hooks/UseBoolean'
import {useQuery} from 'react-query'
import {logIn} from '../apiHandler'

const Login = () => {
	const {setAuth} = useContext(AuthContext)
	const userRef = useRef()
	const errRef = useRef()
	const [isToggle, {setToggle}] = useBoolean(false)
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')
	const [success, setSuccess] = useState(false)
	
	useEffect(() => {
		userRef.current.focus()
	}, [])
	
	useEffect(() => {
		setErrMsg('')
	}, [email, pwd])
	
	const queryKey = ['signIn', email, pwd]
	const query = useQuery(queryKey, () => logIn(email, pwd), {
		staleTime: 10_000
	})
	console.log(query.isLoading, query.isFetching)
	console.log(query.error)
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			setAuth({email, pwd, token: query.data}) // Store in auth object and save in global context
			setEmail('')
			setPwd('')
			query.isFetched ? setSuccess(true) : setSuccess(false)
		} catch (err) {
			if (query.error) {
				setErrMsg('invalid input')
			}
		}
		
	}
	
	/*try {
		const token = await refetch().then(res => res.data)
		setAuth({email, pwd, token}) // Store in auth object and save in global context
		localStorage.setItem('AuthJWT', token)
		setEmail('')
		setPwd('')
		setSuccess(true)
	} catch (err) {
		if (!err?.response) {
			setErrMsg('No Server Response')
		} else if (err.response?.status === 400) {
			setErrMsg('Missing email or Password')
		} else if (err.response?.status === 401) {
			setErrMsg('Unauthorized')
		} else {
			setErrMsg('Login Failed')
		}
		errRef.current.focus() // set the focus on err for screen readers
	}*/
	
	
	return (
		<>
			<Header/>
			<main className='main signin__bg-dark'>
				{success ? (
					<section>
						<h1>You are Logged in!</h1>
						<br/>
						<p>
							<a href='#'>Go to Profile</a>
						</p>
					</section>
				) : (
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
				)}
			</main>
			<Footer/>
		</>
	)
}

export default Login
