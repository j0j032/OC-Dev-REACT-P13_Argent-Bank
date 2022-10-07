import React, {useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import {useNavigate} from 'react-router-dom'
import useBoolean from '../../customHooks/UseBoolean'

const SignIn = () => {
	const [isToggle, {setToggle}] = useBoolean(false)
	
	const navigateTo = useNavigate()
	const handleSubmit = e => {
		e.preventDefault()
		// Auth Logic
		// Remember LOGIC
		navigateTo('/profile')
	}
	
	return (
		<>
			<Header/>
			<main className='main signin__bg-dark'>
				<section className='signin__container'>
					<i className='fa fa-user-circle sign-in-icon'></i>
					<h1>Sign In</h1>
					<form className='signin__form'
					      onSubmit={(e)=>handleSubmit(e)}>
						<div className='input__wrapper'>
							<label htmlFor='username'>Username</label>
							<input type='text' id='username'/>
						</div>
						<div className='input__wrapper'>
							<label htmlFor='password'>Password</label>
							<input type='password' id='password'/>
						</div>
						<div className='input__remember'>
							<input onClick={setToggle} defaultChecked={isToggle} type='checkbox' id='remember-me'/>
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
