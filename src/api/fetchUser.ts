import { CartDetailInterface, ProductInterface, TeacherInterface } from '../interface/interface';

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
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
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
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
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
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
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
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			email: obj.email,
			password: obj.password
		})
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
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/reg`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user_type: obj.user_type,
			username: obj.username,
			email: obj.email,
			password: obj.password
		})
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchAddUser FAILED');
	}
};

export const fetchUpdateUser = async (obj: {
	username: string;
	password: string;
}): Promise<void> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			username: obj.username,
			password: obj.password
		})
	});

	if (res.ok) {
		return;
	} else {
		throw new Error('fetchUpdateUser FAILED');
	}
};

export const fetchDeleteUser = async (): Promise<void> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	if (res.ok) {
		return;
	} else {
		throw new Error('fetchDeleteUser FAILED');
	}
};
