import React from 'react'
import logo from '../../assets/img/argentBankLogo.png'
import {NavLink} from 'react-router-dom'

const Header = () => {
	return (
		<header className='header__container'>
			<NavLink to='/'>
				<img className='header__logo' src={logo} alt='logo'/>
			</NavLink>
			<NavLink className='header__nav-container' to='/login'>
				<i className='fa fa-user-circle'></i>
				<p>Sign In</p>
			</NavLink>
		</header>
	)
}

export default Header
