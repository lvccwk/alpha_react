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
	teacher_id: number;
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
	course: any;
	length: number;
}

export const fetchUserAll = async (): Promise<FetchUserAllModel> => {
	console.log('fetchUserAll');
	const res = await fetch(`http://localhost:3000/users/all`);
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

	const res = await fetch(`http://localhost:3000/carts/${id}`, {
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

export const fetchChatHistoryAll = async (): Promise<FetchUserAllModel> => {
	console.log('fetchChatHisttory');
	const res = await fetch(`http://localhost:3000/chatroomHistorys/`);
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
	const res = await fetch(`http://localhost:3000/teachers/${id}`);

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

	const res = await fetch(`http://localhost:3000/teachers`);

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

// 	const res = await fetch('http://localhost:3000/cartDetails/', {
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

	const res = await fetch('http://localhost:3000/users', {
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

	const res = await fetch(`http://localhost:3000/users/${id}`, {
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

	const res = await fetch(`http://localhost:3000/cartDetails/drop/${id}`, {
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

export const fetchCourse = async (): Promise<FetchUserAllModel> => {
	console.log('fetchCourse');

	const res = await fetch(`http://localhost:3000/products/Course`);

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

	const res = await fetch(`http://localhost:3000/products/Note`);

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

	const res = await fetch(`http://localhost:3000/products/${id}`);

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

	const res = await fetch('http://localhost:3000/cartDetails', {
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

	const res = await fetch(`http://localhost:3000/cartDetails/${id}`, {
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

	const res = await fetch(`http://localhost:3000/cartDetails/stripe/${id}`, {
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

	const res = await fetch(`http://localhost:3000/products`, {
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

export const fetchCreateBookmark = async (obj: {
	user_id: number;
	teacher_id: number;
}): Promise<FetchUserAllModel> => {
	console.log('fetchCreateBookmark');

	const res = await fetch(`http://localhost:3000/followedTeachers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			//Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			obj
		})
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

	const res = await fetch(`http://localhost:3000/carts/isBuying/${id}`, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`
		}
	});

	const data = await res.json();

	for(let x = 0; x < data.cart_detail.length; x++){
		await fetch(`http://localhost:3000/purchaseHistorys`, {
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

	const deleteRes = await fetch(`http://localhost:3000/cartDetails/${data.id}`, {
		method: 'DELETE'
	});

	// let purchaseHistorys = await fetch(`http://localhost:3000/purchaseHistorys/${id}`)
	// const phData = await purchaseHistorys.json();
	// console.log("purchaseHistory=",phData)

	if (deleteRes.ok) {
		const delData = await deleteRes.json();
		return delData;
	} else {
		throw new Error('fetchAddPurchaseHistory FAILED');
	}
};

export const fetchCreateTeacher = async (obj:{
	user_id: number;
	info: string;
	rating: number;
}): Promise<FetchUserAllModel> => {
	console.log('fetchCreateTeacher');
	
	const res = await fetch(`http://localhost:3000/teachers`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			obj
		})
	});
	
	if(res.ok) {
		const data = await res.json();
		return data;
	} else {
		throw new Error('fetchCreateTeacher FAILED');
	}

}

export const fetchCreateProduct = async (obj: {
	name: string;
	price: number;
	product_type: string;
	subject_id: number;
	teacher_id: number;
}): Promise<FetchUserAllModel> => {
	console.log('fetchCreateProduct');

	const res = await fetch(`http://localhost:3000/products`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
			//Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			obj
		})
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

	const res = await fetch(`http://localhost:3000/purchaseHistorys/${id}`, {
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
