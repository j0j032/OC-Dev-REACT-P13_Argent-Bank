import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import SignInForm from './SignInForm/SignInForm'

const SignIn = () => {
	
	return (
		<>
			<Header user={''}/>
			<main className='main signin__bg-dark'>
				<section className='signin__container'>
					<i className='fa fa-user-circle sign-in-icon'></i>
					<h1>Sign In</h1>
					<SignInForm/>
				</section>
			</main>
			<Footer/>
		</>
	)
}

export default SignIn
