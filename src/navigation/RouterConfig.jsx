import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Landing from '../modules/landing/Landing'
import Error404 from '../modules/error404/Error404'
import Profile from '../modules/profile/Profile'
import Layout from './Layout'
import SignIn from '../modules/signIn/SignIn'
import RequireAuth from './RequireAuth'

const RouterConfig = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				
				{/*public*/}
				<Route path='/' element={<Landing/>}/>
				<Route path='/signin' element={<SignIn/>}/>
				<Route path='/login' element={<SignIn/>}/>
				
				{/*Private*/}
				<Route element={<RequireAuth/>}>
					<Route path='/profile' element={<Profile/>}/>
				</Route>
				
				{/*CatchAll*/}
				<Route path='*' element={<Error404/>}/>
			
			</Route>
		</Routes>
	)
}

export default RouterConfig
