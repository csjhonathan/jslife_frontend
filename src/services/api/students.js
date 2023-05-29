import api from './api.js';

export function create (body){
	return api.post('/students/register', body);
}

export function update (body, studentId){
	return api.patch(`/students/update/${studentId}`, body);
}

export function updateMe (body, studentId){
	return api.patch(`/students/update/me/${studentId}`, body);
}

export function updatePassword (body, studentId){
	return api.patch(`/students/update/password/${studentId}`, body);
}
export function list (classId){
	let endpoint = '/students/list';
	if(classId){
		endpoint+=`?classId=${classId}`;
	}
	return api.get(endpoint);
}

export function getStudentById (studentId){
	return api.get(`/students/list/${studentId}`);
}

export function signIn (body){
	return api.post('/students/signin', body);
}