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
}

export const fetchCart = async (id: number): Promise<FetchUserAllModel> => {
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

	const res = await fetch(`http://localhost:3000/cartDetails/${id}`, {
		method: 'Delete',
		headers: {
			'Content-Type': 'application/json'
		},

		body: JSON.stringify({id})
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

export const fetchIsBuying = async (id:number,is_buying: boolean): Promise<FetchUserAllModel> => {
	console.log('fetchIsBuying= '+is_buying);

	const res = await fetch(`http://localhost:3000/cartDetails/${id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',Authorization: `Bearer ${localStorage.getItem('token')}`
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
