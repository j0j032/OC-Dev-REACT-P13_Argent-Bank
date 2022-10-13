import {useLocation, Navigate, Outlet} from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const RequireAuth = () => {
	const {auth} = useAuth()
	const location = useLocation()
	return (
		auth?.token || localStorage.getItem('accessToken')
			? <Outlet/>
			: <Navigate to='/login' state={{from: location}} replace/>
	)
}

export default RequireAuth
