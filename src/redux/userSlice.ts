import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {

    isLoggedIn: boolean;

}

const initalState = {

    isLoggedIn: false

}

const userSlice = createSlice({
    name: 'user',
    initialState: initalState,
    reducers: {
        fbLogin: (state: UserState, action: PayloadAction<any>) => {
            const payload = action.payload
            state.isLoggedIn = true
            localStorage.setItem("token", payload.token)
            console.log("token: ", payload.token)
        },
        userLogout: (state: UserState, action: PayloadAction<any>) => {
            state.isLoggedIn = false
            localStorage.removeItem("token")
            console.log("delete token")
        }
    }
})

export const {fbLogin,userLogout} = userSlice.actions
export default userSlice.reducer
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
