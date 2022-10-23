import React, {useEffect} from 'react'
import logo from '../../assets/img/argentBankLogo.png'
import {NavLink, useNavigate} from 'react-router-dom'
import Footer from '../commons/components/Footer/Footer'
import {useDispatch} from 'react-redux'
import {logOut} from '../../feature/auth.slice'

const Error404 = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	
	/**
	 * This use effect always change pathName to /error404
	 * If an api error happen on another page like /profile, when this component is rendering,
	 * the path is automatically replaced
	 */
	useEffect(() => {
		navigate('/error404')
	}, [navigate])
	
	return (
		<>
			<div className='ERROR404'>
				<NavLink onClick={dispatch(logOut)} to='/'><img className='header__logo' src={logo}
				                                                alt='logo'/></NavLink>
				<h1>ERROR 404</h1>
				<NavLink onClick={dispatch(logOut)} to={'/signin'}><p className='home-link'>Back to
				                                                                            login</p>
				</NavLink>
			</div>
			<Footer/>
		</>
	)
}

export default Error404
