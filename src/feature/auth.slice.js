import {createSlice} from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: {user: null, token: null, loggedIn: false},
	reducers: {
		setCredentials: (state, action) => {
			const {user, accessToken, loggedIn} = action.payload
			state.user = user
			state.token = accessToken
			state.loggedIn = loggedIn
		},
		logOut: (state, action) => {
			state.user = null
			state.token = null
			state.loggedIn = false
		}
	}
})

export const {setCredentials, logOut} = authSlice.actions
export default authSlice.reducer

export const getCurrentState = state => state.auth
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentUser = (state) => state.auth.user
export const isCurrentlyLoggedIn = (state) => state.auth.loggedIn
