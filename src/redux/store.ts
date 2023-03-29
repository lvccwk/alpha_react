import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userSlice from "./userSlice";


const store = configureStore({
    reducer: {
      user: userSlice,

    },
  });

  export type IRootState = ReturnType<typeof store.getState>
  export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
  export default store;