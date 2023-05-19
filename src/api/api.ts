import { trace } from 'console';

export let API_ORIGIN = process.env.REACT_APP_API_SERVER;

if (!API_ORIGIN) {
	throw new Error('missing env REACT_APP_API_SERVER');
}

export async function callAPI(method: 'POST' | 'PUT' | 'DELETE', url: string, body?: object) {
	try {
		const init: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		};
		if (body) {
			init.body = JSON.stringify(body);
		}
		const res = await fetch(`${API_ORIGIN}${url}`, init);
		const data = await res.json();
		return data;
	} catch (error) {
		return { error: String(error) };
	}
}
