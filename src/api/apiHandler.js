import axios from 'axios'

const defaultOptions = {
	headers: {'Content-Type': 'application/json'}
}

const computeHeaders = (options = {}) => {
	const authToken = {Authorization: `Bearer ${options.token || ''}`}
	const headers = {}
	
	Object.assign(headers, authToken)
	Object.assign(headers, defaultOptions.headers)
	Object.assign(headers, options.headers || {})
	
	return headers
}

const head = (url) =>
	axios
		.head(url)
		.then((response) => response.status)
		.catch((reason) => (reason.response.status === 404 ? 404 : reason))

const get = (url, options = {}) => {
	return axios({
		method: 'get',
		url: url,
		headers: computeHeaders(options)
	})
}

const post = (url, data, options = {}) => {
	return axios({
		method: 'post',
		url: url,
		headers: computeHeaders(options),
		data
	})
}

const patch = (url, data, options = {}) => {
	return axios({
		method: 'patch',
		url: url,
		headers: computeHeaders(options),
		data
	})
}

const put = (url, data, options = {}) => {
	return axios({
		method: 'put',
		url: url,
		headers: computeHeaders(options),
		data
	})
}

export {head, get, post, patch, put}
