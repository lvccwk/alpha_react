import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode"


export interface UserState {

    isLoggedIn: boolean;
    id: number | null;


}

const initalState = {

    isLoggedIn: false,
    id: null,


}

const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {
        fbLogin: (state: UserState, action: PayloadAction<any>) => {

            const payload = action.payload
            let userObject :any = jwt_decode(payload.token)
            console.log(userObject);
            state.id = userObject.id
            console.log(state.id);
            state.isLoggedIn = true
            localStorage.setItem("token", payload.token)
            console.log("token: ", payload.token)


        },
        userLogout: (state: UserState) => {
            state.id = null
            state.isLoggedIn = false
            localStorage.removeItem("token")
            console.log("delete token")
        }
    }
})

export const {fbLogin,userLogout} = userSlice.actions
export default userSlice.reducer

