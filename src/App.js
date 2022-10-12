import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Error404 from './components/Error404/Error404'
import SignIn from './components/SignIn/SignIn'
import ProfilePage from './components/ProfilePage/ProfilePage'
import Layout from './components/Layout'
import Unauthorized from './components/Unauthorized/Unauthorized'
import Login from './components/Login'

const App = () => {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				
				{/*public*/}
				<Route path='/' element={<LandingPage/>}/>
				<Route path='/signin' element={<SignIn/>}/>
				<Route path='/login' element={<Login/>}/>
				<Route path='/unauthorized' element={<Unauthorized/>}/>
				
				{/*Private*/}
				<Route path='/profile/:token' element={<ProfilePage/>}/>
				
				{/*CatchAll*/}
				<Route path='*' element={<Error404/>}/>
			
			</Route>
		</Routes>
	)
}

export default App
