import api from './api.js';

export function create (body){
	return api.post('/students/register', body);
}

export function update (body, studentId){
	return api.patch(`/students/update/${studentId}`, body);
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