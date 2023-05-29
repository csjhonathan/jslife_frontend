/*eslint-disable no-undef */

import axios from 'axios';

const methods = [
	'get',
	'post',
	'put',
	'delete',
	'patch'
];

const axiosWrapper = {};

const queryStringBuilder = query => {
	return Object.keys(query).length ? '?' + Object.keys(query).map(k => `${k}=${query[k]}`).join('&') : '';
};

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

for (const method of methods) {
	axiosWrapper[method] = async function (route, body, query = {}, complete = false) {
		try {
			const url = `${route}${queryStringBuilder(query)}`;

			const request = await instance({
				method,
				url,
				data: body
			});
			return complete ? request : request.data;
		} catch (err) {
			console.error(err);
			return Promise.reject(err.response);
		}
	};
}

instance.interceptors.request.use(async config => {
	try {
		const token = JSON.parse(localStorage.getItem('js_life_token')) || JSON.parse(sessionStorage.getItem('js_life_token'));
		if (token !== null) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}
		return config;
	} catch (error) {
		return Promise.reject(error);
	}
});

export default axiosWrapper;