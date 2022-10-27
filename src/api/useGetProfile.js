import {useQuery} from 'react-query'
import {getUserProfile} from './profile.requests'

export const useGetProfile = (token) => {
	return useQuery('profile', () => getUserProfile(token), {
		staleTime: 10 * 60 * 1000
	})
}
