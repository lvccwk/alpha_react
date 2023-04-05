export interface UserInterface {
	id: number;
	user_type: string;
	username: string;
	email: string;
	password: string;
	image?: string;
	created_at: Date;
	updated_at: Date;
	is_deleted: boolean;
}

export interface SubjectInterface {
	id: number;
	name: string;
	chinese_name: string;
	created_at: Date;
	updated_at: Date;
}

export interface TeacherInterface {
	id: number;
	user_id: number;
	info: string;
	rating: number;
	created_at: Date;
	updated_at: Date;
}

export interface FollowedTeacherInterface {
	id: number;
	user_id: number;
	teacher_id: number;
}

export interface TeacherSubjectInterface {
	id: number;
	teacher_id: number;
	subject_id: number;
}

export interface ProductInterface {
	id: number;
	name: string;
	price: number;
	product_type: string;
	avg_rating: number;
	file_url: string;
	image: string;
	user_id: number;
	subject_id?: number;
	teacher_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface CartInterface {
	id: number;
	student_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface CartDetailInterface {
	id: number;
	product_id: number;
	cart_id: number;
	is_buying: boolean;
	created_at: Date;
	updated_at: Date;
}

export interface ProductRatingInterface {
	id: number;
	product_id: number;
	student_id: number;
	rating: number;
	created_at: Date;
	updated_at: Date;
}

export interface PurchaseHistoryInterface {
	id: number;
	product_id: number;
	student_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface TimetableInterface {
	id: number;
	time_slot: string;
	user_id: number;
	subject_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface ChatroomInterdace {
	id: number;
	name: string;
	user_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface ChatroomHistoryInterface {
	id: number;
	content: string;
	chatroom_id: number;
	user_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface ChatroomParticipantInterface {
	id: number;
	chatroom_id: number;
	user_id: number;
	created_at: Date;
	updated_at: Date;
}

export interface PrivateMessageInterface {
	id: number;
	from_id: number;
	to_id: number;
	content: string;
	created_at: Date;
	updated_at: Date;
}
