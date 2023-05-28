import api from './api.js';

export function update (registrationId, egress_date){
	return api.patch(`/registrations/${registrationId}?egress_date=${egress_date}`);
}

export function create ({studentId, class_id}){
	return api.post(`/registrations/create/${studentId}`,{class_id});
}