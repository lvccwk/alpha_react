import {
	CartDetailInterface,
	CartInterface,
	ChatroomInterface,
	ChatroomParticipantInterface,
	PrivateMessageInterface,
	ProductInterface,
	ProductRatingInterface,
	PurchaseHistoryInterface,
	SubjectInterface,
	TeacherInterface,
	TimetableInterface,
	UserInterface
} from '../interface/interface';

export interface FetchUserAllModel {
	id: number;
	user_type: string;
	username: string;
	email: string;
	password: string;
	image: string;
	map: any;
	item: any;
	info: string;
	price: number;
	avg_rating: number;
	name: string;
	cart_id: number;
	product_id: number;
	is_buying: boolean;
	teacher_id: any | null;
	cart: CartInterface;
	user: UserInterface;
	cart_detail: CartDetailInterface;
	purchase_history: PurchaseHistoryInterface;
	teacher: TeacherInterface;
	timetable: TimetableInterface;
	product_rating: ProductRatingInterface;
	product: ProductInterface;
	chartoom: ChatroomInterface;
	chatoom_participant: ChatroomParticipantInterface;
	private_message: PrivateMessageInterface;
	subject: SubjectInterface;
	url: string;
	student_id: number;
	course: any | null;
	length: number;
	content: string;
	created_at: string;
	from_id: number;
	to_id: number;
	file_url: string;
	ok: any;
	filter: any | null;
	school: any;
	is_onsale: boolean;
}

export const fetchUserAll = async (): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/all`);
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchCart = async (id: any): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/carts/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCart FAILED');
	}
};

export const fetchChatHistory = async (sender_id: number): Promise<FetchUserAllModel[]> => {
	const res = await fetch(
		`${process.env.REACT_APP_API_SERVER}/privateMessages/all/?receipt=${sender_id}`,
		{
			headers: {
				Authorization: `Bearer ${localStorage.getItem('token')}`
			}
		}
	);

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const addChatRecord = async (obj: {
	from_id: number;
	to_id: number;
	content: string;
}): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/privateMessages/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},

		body: JSON.stringify({ from_id: obj.from_id, to_id: obj.to_id, content: obj.content })
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchTeacher = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers/${id}`);

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchTeacherAll = async (): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers`);

	if (res.ok) {
		const data = await res.json();

		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchUpdateUser = async (obj: {
	username: string;
	email: string;
	password: string;
}): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: obj.username,
			email: obj.email,
			password: obj.password
		})
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchUpdateUser FAILED');
	}
};

export const fetchDeleteUser = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			id
		})
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchDeleteUser FAILED');
	}
};

export const fetchDropFromCart = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails/drop/${id}`, {
		method: 'Delete',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({ id })
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchDropFromCart FAILED');
	}
};

export const fetchCourseByid = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/${id}`);

	if (res.ok) {
		const data = await res.json();

		return data;
	} else {
		throw new Error('fetchCourse FAILED');
	}
};

export const fetchCourse = async (): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/Course`);

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCourse FAILED');
	}
};

export const fetchNote = async (): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/Note`);

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchNote FAILED');
	}
};

export const fetchProduct = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/${id}`);

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchProduct FAILED');
	}
};

export const fetchAddCart = async (obj: {
	cart_id: number;
	product_id: number;
	is_buying: boolean;
}): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify(obj)
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchAddCart FAILED');
	}
};

export const fetchIsBuying = async (id: number, is_buying: boolean): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			is_buying
		})
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchIsBuying FAILED');
	}
};

export const stripeCheckOut = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails/stripe/${id}`, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchIsBuying FAILED');
	}
};

export const fetchFile = async (file: File): Promise<FetchUserAllModel> => {
	const formData = new FormData();
	formData.append('file', file);
	formData.append('name', 'abcd');
	formData.append('sacas', 'sacas');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/file`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: formData
	});

	try {
		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);

		throw new Error('fetchFile FAILED');
	}
};

export const fetchTeacherBookmark = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/followedTeachers/all`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchTeacherBookmark FAILED');
	}
};

export const fetchDeleteBookmark = async (obj: {
	user_id: number;
	teacher_id: number;
}): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/followedTeachers`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify(obj)
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCreateBookmark FAILED');
	}
};

export const fetchCreateBookmark = async (obj: {
	user_id: number;
	teacher_id: number;
}): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/followedTeachers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify(obj)
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCreateBookmark FAILED');
	}
};

export const fetchAddPurchaseHistory = async (id: any): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/carts/isBuying/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	const data = await res.json();
	for (let x = 0; x < data.cart_detail.length; x++) {
		await fetch(`${process.env.REACT_APP_API_SERVER}/purchaseHistorys`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				product_id: data.cart_detail[x].product_id,
				student_id: id
			})
		});
	}

	const deleteRes = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails/${data.id}`, {
		method: 'DELETE'
	});

	if (deleteRes.ok) {
		const delData = await deleteRes.json();
		return delData;
	} else {
		throw new Error('fetchAddPurchaseHistory FAILED');
	}
};

export const fetchUserByTeacherId = async (ids: number[]): Promise<any[]> => {
	const userTeacherIds = [];
	for (let x = 0; x < ids.length; x++) {
		try {
			const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers/${ids[x]}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});
			if (res.ok) {
				const data = await res.json();
				userTeacherIds.push({
					teacher_id: ids[x],
					user_id: data.user_id,
					username: data.user.username
				});
			}
		} catch (error) {
			console.log('fetchUserByTeacherId FAILED', error);
		}
	}
	return userTeacherIds;
};

export const fetchCreateTeacher = async (obj: {
	user_id: number;
	info: string;
	school: string;
	experience: number;
}): Promise<void> => {
	try {
		obj.experience = Number(obj.experience);
		const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
	} catch (error) {
		console.log(error);
	}
};

export const fetchCreateProduct = async (formData: FormData): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products`, {
		mode: 'cors',
		method: 'POST',
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: formData
	});

	if (res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCreateProduct FAILED');
	}
};

export const fetchPurchaseHistory = async (id: any): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/purchaseHistorys/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	if (res.ok) {
		const data = await res.json();

		return data;
	} else {
		throw new Error('fetchPurchaseHistory FAILED');
	}
};

export const fetchTeacherProduct = async (id: number): Promise<FetchUserAllModel> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/teacher/${id}`);

	if (res.ok) {
		const data = await res.json();

		return data;
	} else {
		throw new Error('fetchTeacherProduct FAILED');
	}
};

export const fetchUpdateProduct = async (obj: {
	id: number;
	name: string;
	price: number;
	info: string;
	is_onsale: boolean;
}): Promise<void> => {
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/${obj.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			name: obj.name,
			price: obj.price,
			info: obj.info,
			is_onsale: Boolean(Number(obj.is_onsale))
		})
	});

	if (res.ok) {
		console.log('update product success');
		return;
	} else {
		throw new Error('fetchUpdateProduct FAILED');
	}
};
