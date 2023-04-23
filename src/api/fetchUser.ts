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
		console.log({
			fetchUser: data
		});
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
	console.log(res);
	if (res.ok) {
		const data = await res.json();
		console.log({
			fetchUser: data
		});
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
	console.log(res);
	if (res.ok) {
		const data = await res.json();
		console.log({
			fetchUser: data
		});
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const loginUser = async (obj: {
	email: string;
	password: string;
}): Promise<FetchUserModel> => {
	console.log('LoginUser');

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
	console.log('fetchAddUser');

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
	//user_type: string,
	username: string;
	password: string;
	//image: string,
}): Promise<void> => {
	console.log('fetchUpdateUsers', obj);
	const res = await fetch(`${process.env.REACT_APP_API_SERVER}/users`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`
		},
		body: JSON.stringify({
			username: obj.username,
			password: obj.password
			//image: obj.image,
		})
	});

	if (res.ok) {
		return;
	} else {
		throw new Error('fetchUpdateUser FAILED');
	}
};

export const fetchDeleteUser = async (): Promise<void> => {
	console.log('fetchDeleteUser');

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
