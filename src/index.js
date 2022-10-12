import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import {QueryClientProvider, QueryClient} from 'react-query'
import {ReactQueryDevtools} from 'react-query/devtools'
import {Provider} from 'react-redux'
import store from './app/store'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {AuthProvider} from './context/AuthProvider'

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<Provider store={store}>
			<AuthProvider>
				<QueryClientProvider client={queryClient}>
					<Routes>
						<Route path='/*' element={<App/>}></Route>
					</Routes>
					<ReactQueryDevtools initialIsOpen={false}/>
				</QueryClientProvider>
			</AuthProvider>
		</Provider>
	</BrowserRouter>
)
