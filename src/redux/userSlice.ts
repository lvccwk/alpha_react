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
        fbLogin: (state: UserState, payloadAction: PayloadAction) => {
            state.isLoggedIn = true
        }
    }
})

export const {fbLogin} = userSlice.actions
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
