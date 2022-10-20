import {useLocation, Navigate, Outlet} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectCurrentToken} from '../feature/auth.slice'

/**
 * To check private routes - if a token exist, you can access else you go back from where you from
 * @returns {JSX.Element}
 */
const RequireAuth = () => {
	const token = useSelector(selectCurrentToken)
	const location = useLocation()
	return (
		token
			? <Outlet/>
			: <Navigate to='/login' state={{from: location}} replace/>
	)
}

export default RequireAuth
