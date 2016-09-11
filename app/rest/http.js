import axios from 'axios';

export default {
	get: (url, header) => {
		let option = {
			url: url,
			method: 'GET',
			headers: header
		};

		return axios(option);
	},
	post: (url, header, body) => {
		let option = {
			url: url,
			method: 'POST',
			headers: header,
			data: body
		};

		return axios(option);
	}
}