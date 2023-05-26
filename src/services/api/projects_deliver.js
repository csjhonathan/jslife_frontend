import api from './api.js';

export function deliver (body){
	return api.post('/projects/deliver', body);
}

export function listDeliveredProjects (query){
	return api.get('/projects/deliver/list', {}, query);
}

export function updateDeliveredProject (body, deliverId){
	return api.patch(`/projects/deliver/update/${deliverId}`, body);
}