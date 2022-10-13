import React from 'react'
import logo from '../../assets/img/argentBankLogo.png'
import {NavLink, useLocation} from 'react-router-dom'

const Header = ({user}) => {
	
	const location = useLocation()
	return (
		<header className='header__container'>
			<NavLink to='/'>
				<img className='header__logo' src={logo} alt='logo'/>
			</NavLink>
			{
				location.pathname.split('/')[1] === 'profile' ? (
					<div className='header__nav-container--profile'>
						<i className='fa fa-user-circle sign-in-icon'></i>
						<p className='header__userName'>{user}</p>
						<NavLink className='header__nav-container' to={'/'}>
							<i className='fa fa-sign-out'></i>
							<p>Sign Out</p>
						</NavLink>
					</div>
				) : (
					<NavLink className='header__nav-container' to='/login'>
						<i className='fa fa-user-circle'></i>
						<p>Sign In</p>
					</NavLink>
				)}
		
		</header>
	)
}

export default Header
