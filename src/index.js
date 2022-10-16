import React from 'react'
import './index.scss'
import ReactDOM from 'react-dom/client'
import RouterConfig from './navigation/RouterConfig'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {Provider} from 'react-redux'
import store from './app/store'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Routes>
					<Route path='/*' element={<RouterConfig/>}></Route>
				</Routes>
				<ReactQueryDevtools initialIsOpen={false}/>
			</QueryClientProvider>
		</Provider>
	</BrowserRouter>
)
