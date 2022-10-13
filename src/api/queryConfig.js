import {QueryClient} from 'react-query'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			refetchOnmount: false,
			refetchOnReconnect: false,
			retry: 1,
			staleTime: 5 * 1000
		}
	}
})

export default queryClient
