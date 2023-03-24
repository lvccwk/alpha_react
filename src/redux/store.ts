import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

export interface IRootState {
    user: any;

}

const store = configureStore({
    reducer: {
      user: userSlice,

    },
  });

export default store;