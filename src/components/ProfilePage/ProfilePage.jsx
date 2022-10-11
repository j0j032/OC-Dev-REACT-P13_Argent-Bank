import React from 'react'
import {useQuery} from 'react-query'
import {fetchUserProfile} from '../../apiHandler'
import {useParams} from 'react-router-dom'

const ProfilePage = () => {
	const {token} = useParams()
	const queryKey = ['fetchUserProfile']
	const {data, isLoading} = useQuery(queryKey,()=>fetchUserProfile(token))
	
	return isLoading? (<h1>IS LOADING...</h1>):(
		<div>
			Hello {data.firstName}
		</div>
	)
}

export default ProfilePage
