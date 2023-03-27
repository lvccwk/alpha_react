export interface FetchUserModel {
	id: number;
	user_type: string;
	username: string;
	email: string;
	password: string;
	image: string;
}

export const fetchUser = async (id: number): Promise<FetchUserModel> => {
	console.log('fetchUser');

	const res = await fetch(`http://localhost:3000/users/${id}`);

	if (res.ok) {
		const data = await res.json();
		console.log(data);
		return data;
	} else {
		throw new Error('fetchUser FAILED');
	}
};

export const fetchAddUser = async (obj: {
	user_type: string;
	username: string;
	email: string;
	password: string;
	//image: string,
}): Promise<FetchUserModel> => {
	console.log('fetchAddUser');

	const res = await fetch('http://localhost:3000/users', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			user_type: obj.user_type,
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
		throw new Error('fetchAddUser FAILED');
	}
};

export const fetchUpdateUser = async (obj: {
	// id: number;
	//user_type: string,
	username: string;
	email: string;
	password: string;
	//image: string,
}): Promise<FetchUserModel> => {
	console.log('fetchUpdateUsers', obj);
	const res = await fetch(`http://localhost:3000/users/${2}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			// id: obj.id,
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

export const fetchDeleteUser = async (id: number): Promise<void> => {
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
