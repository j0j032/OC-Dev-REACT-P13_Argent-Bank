import React from 'react'
import logo from '../../assets/img/argentBankLogo.png'
import {NavLink, useLocation} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logOut} from '../../feature/auth.slice'

const Header = ({user}) => {
	const dispatch = useDispatch()
	const location = useLocation()
	
	const defaultNav = (
		<NavLink className='header__nav-container' to='/login'>
			<i className='fa fa-user-circle'></i>
			<p>Sign In</p>
		</NavLink>
	)
	
	function handleLogout() {
		dispatch(logOut)
		localStorage.clear('Token')
	}
	
	const profileNav = (
		<div className='header__nav-container--profile'>
			<i className='fa fa-user-circle sign-in-icon'></i>
			<p className='header__userName'>{user}</p>
			<NavLink onClick={handleLogout} className='header__nav-container'
			         to={'/'}>
				<i className='fa fa-sign-out'></i>
				<p>Sign Out</p>
			</NavLink>
		</div>
	)
	
	return (
		<header className='header__container'>
			<NavLink to='/'><img className='header__logo' src={logo} alt='logo'/></NavLink>
			{location.pathname.split('/')[1] === 'profile' ? (profileNav) : (defaultNav)}
		</header>
	)
}

export default Header
