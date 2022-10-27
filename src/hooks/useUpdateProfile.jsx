import React from 'react'
import {useMutation, useQueryClient} from 'react-query'
import {updateUserNames} from '../api/profile.requests'

const UseUpdateProfile = async (data, token) => {
	const queryClient = useQueryClient(data, token)
	return useMutation(updateUserNames(data, token), {
		onSuccess: () => {
			queryClient.invalidateQueries('profile')
		}
	})
}

export default UseUpdateProfile
