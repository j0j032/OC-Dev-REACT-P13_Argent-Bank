import {createSlice} from '@reduxjs/toolkit'

//const userToken = localStorage.getItem('Auth') ? localStorage.getItem('Auth') : null

const initialState = {
	userInfo: {},
	userToken: null
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfos: (state, {payload}) => {
			state.userInfo = {payload}
		}
	}
})

export const {setUserInfos} = userSlice.actions
export default userSlice.reducer
