import React from 'react'
import {NavLink} from 'react-router-dom'
import logo from '../../assets/img/argentBankLogo.png'

const Loader = () => {
	return (
		<>
			<header className='header__container'>
				<NavLink to='/'><img className='header__logo' src={logo} alt='logo'/></NavLink>
			</header>
			<div className='lds-centered'>
				<div className='lds-spinner'>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		</>
	)
}

export default Loader
