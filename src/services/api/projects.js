import api from './api.js';
export function list (){
	return api.get('/projects/list');
}