import {createSlice} from '@reduxjs/toolkit'

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
		},
		setAccessToken: (state, {payload}) => {
			state.userToken = {payload}
		}
	}
})

export const {setUserInfos, setAccessToken} = userSlice.actions
export default userSlice.reducer
