import React from 'react'
import useAuth from '../../hooks/useAuth'

const ProfilePage = () => {
	const {auth} = useAuth()
	
	return (
		<div>
			Hello {auth.email}
		</div>
	)
}

export default ProfilePage
