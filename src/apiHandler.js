import axios from 'axios'

const api = axios.create({
	baseURL: 'http://localhost:3001/api/v1',
})

export function logIn(email, password){
	return api.post('/user/login', {email,password}).then(res=> res.data.body.token)
}

export function signUp(email,password,firstName,lastName){
	return api.post('/user/signup',{email,password,firstName,lastName}).then(res=>console.log(res))
}

export function fetchUserProfile(token){
	return api.post('/user/profile', {},{headers: {"Authorization" : `Bearer ${token}`}}).then(res=>res.data.body)
}

export function updateUserProfile({firstName, lastName}){
	return api.put('/user/profile',{firstName,lastName}).then(res=>console.log(res))
}
