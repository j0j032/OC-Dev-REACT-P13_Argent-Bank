import {post, put} from '../../api/apiHandler'

const API_URL = 'http://localhost:3001/api/v1'
const profileUrl = `${API_URL}/user/profile`

const getUserProfile = token => post(profileUrl, {}, {headers: {'Authorization': `Bearer ${token}`}}).then(res => res.data.body)
const updateUserProfile = (userData, token) => put(profileUrl, userData, {headers: {'Authorization': `Bearer ${token}`}})

export {getUserProfile, updateUserProfile}
