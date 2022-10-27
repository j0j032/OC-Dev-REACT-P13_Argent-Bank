import React from 'react'
import logo from '../../../../assets/img/argentBankLogo.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {
	logOut, selectCurrentToken,
	selectCurrentUser
} from '../../../../feature/auth.slice'
import {useQuery} from 'react-query'
import {getUserProfile} from '../../../../api/profile.requests'
import {useProfile} from '../../../../hooks/useProfile'

const Header = ({firstName}) => {
	const dispatch = useDispatch()
	const token = useSelector(selectCurrentToken)
	
	function handleLogout() {
		dispatch(logOut())
	}
	
	const defaultNav = (
		<NavLink className='header__nav-container' to='/login'>
			<i className='fa fa-user-circle'></i>
			<p>Sign In</p>
		</NavLink>
	)
	
	const profileNav = (
		<div className='header__nav-container--profile'>
			<NavLink className='header__user-container' to='/profile'>
				<i className='fa fa-user-circle sign-in-icon'></i>
				<p className='header__userName'>{firstName}</p>
			</NavLink>
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
			{token ? (profileNav) : (defaultNav)}
		</header>
	)
}

export default Header
