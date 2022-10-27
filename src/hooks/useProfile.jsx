import React from 'react'
import {useQuery} from 'react-query'
import {getUserProfile} from '../api/profile.requests'

export const useProfile = (token) => {
	return useQuery('profile', () => getUserProfile(token), {
		staleTime: 10 * 60 * 1000
	})
}
