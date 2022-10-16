import {post} from './apiHandler'

const API_URL = 'http://localhost:3001/api/v1'
const loginUrl = `${API_URL}/user/login`
const signupUrl = `${API_URL}/user/signup`

/**
 * Check if the username and password given are valid on the server
 * @param {Object} param0 { email, password }
 * @prop {String} param0.email - The email of the user
 * @prop {String} param0.password - The password of the user
 * @returns {Object} Returns access token
 */
const login = ({email, password}) =>
	post(loginUrl, {email, password}).then(res => res.data.body.token)


/**
 * Create a new user
 * @param {Object} param0 {email, password, firstname, lastName}
 * @prop {String} param0.email - The email of the user
 * @prop {String} param0.password - The password of the user
 * @prop {String} param0.firstName - The firstname of the user
 * @prop {String} param0.lastName - The lastname of the user
 * @returns {Object} Returns { "status": "int","message": "string","body": {"id": "string","email": "string"}}
 */
const signup = ({email, password, firstName, lastName}) =>
	post(signupUrl, {email, password, firstName, lastName}).then(res => res.data)

export {login, signup}
