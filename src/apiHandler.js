import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3001/api/v1',
	timeout : 5000,
	headers:{
		Authorization: 'Bearer secret',
	}
})

export function logIn(email, password){
	return api.post('/user/login', {email,password}).then(res=>console.log(res.data.body.token))
}

export function signUp(email,password,firstName,lastName){
	return api.post('/user/signup',{email,password,firstName,lastName}).then(res=>console.log(res))
}

export function fetchUserProfile(token){
	return api.post('/user/profile', {token}).then(res=>console.log(res))
}

export function updateUserProfile({firstName, lastName}){
	return api.put('/user/profile',{firstName,lastName}).then(res=>console.log(res))
}
