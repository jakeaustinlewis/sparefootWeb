import rp from 'request-promise';

const baseUrl = 'http://localhost:7777/api';

export function fetchAnimals() {
	return rp({
		uri: `${baseUrl}/animals`,
		json: true
	});
}