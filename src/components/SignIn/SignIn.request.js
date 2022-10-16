import {post} from '../../api/apiHandlerT'

const API_URL = 'http://localhost:3001/api/v1'
const loginUrl = `${API_URL}/user/login`

/**
 * Check if the username and password given are valid on the server
 * @param {Object} param0 { email, password }
 * @prop {String} param0.email - The email of the user
 * @prop {String} param0.password - The password of the user
 * @returns {Object} Returns access token
 */
const login = ({email, password}) =>
	post(loginUrl, {email, password}).then(res => res.data.body.token)

export {login}
