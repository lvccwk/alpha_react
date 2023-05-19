import { CartDetailInterface, ProductInterface, TeacherInterface } from '../interface/interface';
import { API_ORIGIN, callAPI } from './api';

export interface FetchUserModel {
	id: number;
	user_type: string;
	username: string;
	email: string;
	password: string;
	image: string;
	cart: any;
	cart_detail: CartDetailInterface;
	product: ProductInterface;
	product_name: string;
	name: string;
	json: any;
	teacher: TeacherInterface[];
}

export const fetchUserCheck = async (id: number | null): Promise<FetchUserModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchUser = async (): Promise<FetchUserModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchAllUser = async (): Promise<FetchUserModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/all`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const loginUser = async (obj: {
	email: string;
	password: string;
}): Promise<FetchUserModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: obj.email,
			password: obj.password,
		}),
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchAddUser FAILED');
	}
};

export const fetchAddUser = async (obj: {
	user_type: string;
	username: string;
	email: string;
	password: string;
}): Promise<FetchUserModel> => {
	return callAPI('POST', '/user/reg', obj);
};

export const fetchUpdateUser = async (obj: {
	username: string;
	password: string;
}): Promise<void> => {
	return callAPI('PUT', '/users', obj);
};

export const fetchDeleteUser = async (): Promise<void> => {
	return callAPI('DELETE', '/users');
};
