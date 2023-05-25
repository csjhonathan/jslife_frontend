import api from './api.js';

export function update (registrationId, egress_date){
	return api.patch(`/registrations/${registrationId}?egress_date=${egress_date}`);
}