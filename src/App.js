import React from 'react'
import {Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Error404 from './components/Error404/Error404'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Layout from './components/Layout'
import SignIn from './components/SignIn/SignIn'
import RequireAuth from './feature/auth/RequireAuth'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				
				{/*public*/}
				<Route path='/' element={<LandingPage/>}/>
				<Route path='/signin' element={<SignIn/>}/>
				<Route path='/login' element={<SignIn/>}/>
				
				{/*Private*/}
				<Route element={<RequireAuth/>}>
					<Route path='/profile' element={<ProfilePage/>}/>
				</Route>
				
				{/*CatchAll*/}
				<Route path='*' element={<Error404/>}/>
			
			</Route>
		</Routes>
	)
}

export default App
