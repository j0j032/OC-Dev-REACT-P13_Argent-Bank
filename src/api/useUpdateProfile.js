import {useMutation, useQueryClient} from 'react-query'
import {updateUserNames} from './profile.requests'

export const useUpdateProfile = (token) => {
	const queryClient = useQueryClient()
	return useMutation(async (data) => {
		await updateUserNames(data, token)
	}, {
		onSuccess: () => queryClient.invalidateQueries('profile')
	})
}
