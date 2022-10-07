import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import LandingPage from './components/LandingPage/LandingPage'
import Error404 from './components/Error404/Error404'
import SignIn from './components/SignIn/SignIn'
import ProfilePage from './components/ProfilePage/ProfilePage'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LandingPage/>}/>
                <Route path='/signin' element={<SignIn/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='*' element={<Error404/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
