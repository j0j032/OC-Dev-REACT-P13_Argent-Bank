import React, {useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../hooks/UseBoolean'
import {useQuery} from 'react-query'
import {logIn} from '../../api/apiHandler'
import {useDispatch} from 'react-redux'
import {setJWT} from '../../feature/user.slice'

const SignIn = () => {
	const [isToggle, {setToggle}] = useBoolean(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigateTo = useNavigate()
	const dispatch = useDispatch()
	
	const tony = {email: 'tony@stark.com', password: 'password123'}
	
	
	const queryKey = ['signIn']
	const {
		refetch,
		isLoading,
		isSuccess,
		error
	} = useQuery(queryKey, () => logIn(email, password), {
		enabled: false
	})
	
	
	const redirect = (data) => {
		isLoading ? navigateTo(`/profile/`) : navigateTo('/signin')
	}
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		await refetch()
			.then(res => {
				localStorage.setItem('AuthJWT', res.data)
			})
	}
	
	return (
		<>
			<Header/>
			<main className='main signin__bg-dark'>
				<section className='signin__container'>
					<i className='fa fa-user-circle sign-in-icon'></i>
					<h1>Sign In</h1>
					<form className='signin__form'
					      onSubmit={(e) => handleSubmit(e)}>
						<div className='input__wrapper'>
							<label htmlFor='email'>Email</label>
							<input onChange={(e) => setEmail(e.target.value)} type='email'
							       id='email'/>
						</div>
						<div className='input__wrapper'>
							<label htmlFor='password'>Password</label>
							<input onChange={(e) => setPassword(e.target.value)} type='password'
							       id='password'/>
						</div>
						<div className='input__remember'>
							<input onClick={setToggle} defaultChecked={isToggle} type='checkbox'
							       id='remember-me'/>
							<label htmlFor='remember-me'>Remember me</label>
						</div>
						<button className='signin__btn'>Sign In</button>
					</form>
				</section>
			</main>
			<Footer/>
		</>
	)
}

export default SignIn
