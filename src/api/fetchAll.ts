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
	is_onsale: boolean;
}

export const fetchUserAll = async (): Promise<FetchUserAllModel> => {
	console.log('fetchUserAll');
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/all`);
	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchCart = async (id: any): Promise<FetchUserAllModel> => {
	console.log('fetchCart');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/carts/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});
	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchCart FAILED');
	}
};

export const fetchChatHistory = async (sender_id: number): Promise<FetchUserAllModel[]> => {
	console.log('fetchChatHistoryAll');
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
		console.log(data);
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
	console.log('addChatRecord');

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
		console.log(data);
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchTeacher = async (id: number): Promise<FetchUserAllModel> => {
	console.log('fetchUser');
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers/${id}`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchTeacherAll = async (): Promise<FetchUserAllModel> => {
	console.log('fetchUser');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

// export const fetchAddUser = async (obj: {
// 	user_type: string;
// 	username: string;
// 	email: string;
// 	password: string;
// 	//image: string,
// }): Promise<FetchUserAllModel> => {
// 	console.log('fetchAddUser');

// 	const res = await fetch('${process.env.REACT_APP_API_SERVER}/cartDetails/', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify({
// 			user_type: obj.user_type,
// 			username: obj.username,
// 			email: obj.email,
// 			password: obj.password
// 			//image: obj.image,
// 		})
// 	});

// 	if (res.ok) {
// 		const data = await res.json();
// 		return data;
// 	} else {
// 		throw new Error('fetchAddUser FAILED');
// 	}
// };

export const fetchUpdateUser = async (obj: {
	//id: number | string,
	//user_type: string,
	username: string;
	email: string;
	password: string;
	//image: string,
}): Promise<FetchUserAllModel> => {
	console.log('fetchUpdateUsers');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			username: obj.username,
			email: obj.email,
			password: obj.password
			//image: obj.image,
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
	console.log('fetchDeleteUser');

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
	console.log('fetchDropFromCart');

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
	console.log('fetchCourseByid');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/${id}`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchCourse FAILED');
	}
};

export const fetchCourse = async (): Promise<FetchUserAllModel> => {
	console.log('fetchCourse');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/Course`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchCourse FAILED');
	}
};

export const fetchNote = async (): Promise<FetchUserAllModel> => {
	console.log('fetchNote');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/Note`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchNote FAILED');
	}
};

export const fetchProduct = async (id: number): Promise<FetchUserAllModel> => {
	console.log('fetchProduct');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/${id}`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
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
	console.log('fetchAddCart');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			// Authorization: `Bearer ${localStorage.getItem('token')}`
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
	console.log('fetchIsBuying= ' + is_buying);

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
	// console.log('fetchIsBuying= ' + is_buying);

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
	console.log('fetchFile');
	const formData = new FormData();
	formData.append('file', file);
	formData.append('name', 'abcd');
	formData.append('sacas', 'sacas');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users/file`, {
		method: 'POST',
		headers: {
			// 'Content-Type': 'multipart/form-data',
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
	// console.log(res);

	// if (res.ok) {
	// 	const data = await res.json();
	// 	return data;
	// } else {
	// 	throw new Error('fetchFile FAILED');
	// }
};


export const fetchTeacherBookmark = async (id: number): Promise<FetchUserAllModel> => {
	console.log('fetchTeacherBookmark');
	const res = await fetch(`http://localhost:3000/followedTeachers/all`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});
	console.log(res);
	if (res.ok) {
		const data = await res.json();
		console.log(
			data
		);
		return data;
	} else {
		throw new Error('fetchTeacherBookmark FAILED');
	}
};

export const fetchDeleteBookmark = async (obj: {
	user_id: number;
	teacher_id: number;
}): Promise<FetchUserAllModel> => {
	console.log('fetchCreateBookmark');

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
	console.log('fetchCreateBookmark');

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
	console.log('fetchAddPurchaseHistory');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/carts/isBuying/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	const data = await res.json();
	console.log('data', data);
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
		// console.log("TESTING=",x)
	}

	const deleteRes = await fetch(`${process.env.REACT_APP_API_SERVER}/cartDetails/${data.id}`, {
		method: 'DELETE'
	});

	// let purchaseHistorys = await fetch(`${process.env.REACT_APP_API_SERVER}/purchaseHistorys/${id}`)
	// const phData = await purchaseHistorys.json();
	// console.log("purchaseHistory=",phData)

	if (deleteRes.ok) {
		const delData = await deleteRes.json();
		return delData;
	} else {
		throw new Error('fetchAddPurchaseHistory FAILED');
	}
};

export const fetchUserByTeacherId = async (ids: number[]): Promise<any[]> => {
	console.log('fetchUserByTeacherId');
	console.log(ids);
	const userTeacherIds = []
	for (let x = 0; x < ids.length; x++) {
		try {
			const res = await fetch(`http://localhost:3000/teachers/${ids[x]}`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem('token')}`
				}
			});
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				userTeacherIds.push({
					teacher_id: ids[x],
					user_id: data.user_id,
					username: data.user.username

				})
			}
			console.log("res",res);
		} catch (error) {
			console.log('fetchUserByTeacherId FAILED',error);
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
	console.log('fetchCreateTeacher');
	console.log('object', obj);
	try {
		obj.experience = Number(obj.experience);
		const res = await fetch(`${process.env.REACT_APP_API_SERVER}/teachers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(obj)
		});
		console.log(res);
		//console.log(await res.json());
	} catch (error) {
		console.log(error);
	}

	// if (res.ok) {
	// 	//const data = await res.json();
	// 	//console.log(data);
	// 	return;
	// } else {
	// 	throw new Error('fetchCreateTeacher FAILED');
	// }
};

export const fetchCreateProduct = async (formData: FormData): Promise<FetchUserAllModel> => {
	console.log('fetchCreateProduct');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products`, {
		method: 'POST',
		headers: {
			// 'Content-Type': 'application/json'
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
	console.log('fetchPurchaseHistory');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/purchaseHistorys/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchPurchaseHistory FAILED');
	}
};

export const fetchTeacherProduct = async (id: number): Promise<FetchUserAllModel> => {
	console.log('fetchTeacherProduct');

	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/products/teacher/${id}`);

	if (res.ok) {
		const data = await res.json();
		// console.log(data);
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
	console.log('fetchUpdateProduct', obj);
	console.log("FETCHPRODUCTONSALE",Boolean(Number(obj.is_onsale)))
	const res = await fetch(`http://localhost:3000/products/${obj.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
			// Authorization: `Bearer ${localStorage.getItem('token')}`
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

/*
USER TABLE:
model Users {
  id                  Int                   @id @default(autoincrement())
  user_type           String                @db.VarChar(255)
  username            String?               @db.VarChar(255)
  email               String                @unique @db.VarChar(255)
  password            String                @db.VarChar(255)
  image               String                @db.Text
  created_at          DateTime              @default(now()) @db.Timestamp
  updated_at          DateTime              @updatedAt @db.Timestamp
  subject             Subjects[]
  product             Products[]
  purchase_history    PurchaseHistorys[]
  cart                Carts[]
  teacher             Teachers[]
  timetable           Timetables[]
  product_rating      ProductRatings[]
  chartoom            Chatrooms[]
  chatoom_participant ChatoomParticipants[]
  private_message     PrivateMessages[]
}
*/
