import React from 'react'
import {useSelector} from 'react-redux'

const ProfilePage = () => {
	const userData = useSelector(state => state.user.userInfo.payload)
	
	return (
		<div>
			Hello {userData.firstName + userData.lastName}
		</div>
	)
}

export default ProfilePage
