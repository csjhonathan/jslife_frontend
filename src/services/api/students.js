import api from './api.js';

export function create (body){
	return api.post('/students/register', body);
}

export function list (classId){
	let endpoint = '/students/list';
	if(classId){
		endpoint+=`?classId=${classId}`;
	}
	return api.get(endpoint);
}