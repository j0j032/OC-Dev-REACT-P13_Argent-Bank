import React, {useEffect} from 'react'
import logo from '../../../../assets/img/argentBankLogo.png'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import useBoolean from '../../../../hooks/useBoolean'
import {
	isCurrentlyLoggedIn,
	logOut,
	selectCurrentUser
} from '../../../../feature/auth.slice'

const Header = () => {
	const dispatch = useDispatch()
	const user = useSelector(selectCurrentUser) || localStorage.getItem('user')
	const isLoggedIn = useSelector(isCurrentlyLoggedIn) || localStorage.getItem('isConnected') === 'true'
	const [connected, {setTrue: connectUser, setFalse: disconnectUser}] = useBoolean(false)
	
	function handleLogout() {
		dispatch(logOut())
		localStorage.clear()
		disconnectUser()
	}
	
	// to keep profile nav if user is connected and navigate somewhere else than profile page
	useEffect(() => {
		if (isLoggedIn) connectUser()
	}, [isLoggedIn, connectUser])
	
	
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
				<p className='header__userName'>{user}</p>
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
			{connected ? (profileNav) : (defaultNav)}
		</header>
	)
}

export default Header
