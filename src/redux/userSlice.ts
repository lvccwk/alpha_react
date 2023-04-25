import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const checkId: any = () => {
	if (checkIsLoggedIn()) {
		const token: any = localStorage.getItem('token');
		let userObject: any = jwt_decode(token);
		const id: number = userObject.id;
		return id;
	} else {
		return null;
	}
};
const checkIsLoggedIn: any = () => {
	return !!localStorage.getItem('token');
};

export interface UserState {
	isLoggedIn: boolean;
	id: number | null;
}

const initalState = {
	isLoggedIn: checkIsLoggedIn(),
	id: checkId()
};

const userSlice = createSlice({
	name: 'user',
	initialState: initalState,
	reducers: {
		generalLogin: (state: UserState, action: PayloadAction<any>) => {
			const payload = action.payload;
			let userObject: any = jwt_decode(payload.token);
			state.id = userObject.id;
			state.isLoggedIn = true;
		},
		fbLogin: (state: UserState, action: PayloadAction<any>) => {
			const payload = action.payload;
			let userObject: any = jwt_decode(payload.token);
			state.id = userObject.id;
			state.isLoggedIn = true;
			localStorage.setItem('token', payload.token);
		},
		userLogout: (state: UserState) => {
			state.id = null;
			state.isLoggedIn = false;
			localStorage.removeItem('token');
		}
	}
});

export const { fbLogin, userLogout, generalLogin } = userSlice.actions;
export default userSlice.reducer;
