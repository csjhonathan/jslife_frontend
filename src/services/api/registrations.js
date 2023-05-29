import api from './api.js';

export function update (registrationId,body){
	return api.patch(`/registrations/update/${registrationId}`, body);
}
export function close (registrationId, body){
	return api.patch(`/registrations/close/${registrationId}`, body);
}

export function create ({studentId, class_id}){
	return api.post(`/registrations/create/${studentId}`,{class_id});
}