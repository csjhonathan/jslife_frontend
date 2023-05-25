import api from './api.js';

export function getClasses (){
	return api.get('/classes/list');
}