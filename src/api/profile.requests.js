import {post, put} from './apiHandler'

const API_URL = 'http://localhost:3001/api/v1'
const profileUrl = `${API_URL}/user/profile`
//const BADProfileUrl = `${API_URL}/user/profilee` to check errors


/**
 * To get User information
 * @param {String} token - user authentification token
 * @returns {Object} Returns { "status": "int","message": "string","body": {"id": "string","email": "string"}}
 */
const getUserProfile = token => post(profileUrl, {}, {headers: {'Authorization': `Bearer ${token}`}}).then(res => res.data.body)

/**
 * To update User Names (first && || last)
 * @param {Object} userData - the object has to contain {firstname, lastname}
 * @example const newUserData = {
 * 			'firstName': firstName?.length > 0 ? firstName : user.firstName,
 * 			'lastName': lastName?.length > 0 ? lastName : user.lastName
 * 		}
 * @param {String} token - user authentification token
 * @returns {Promise<AxiosResponse<any>>}
 */
const updateUserProfile = (userData, token) => put(profileUrl, userData, {headers: {'Authorization': `Bearer ${token}`}})

export {getUserProfile, updateUserProfile}
