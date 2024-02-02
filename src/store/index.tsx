import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import userReducer from "./slices/userSlice";
import Modal from "react-modal";
import orderSlice from "./slices/orderSlice";
import reserveSlice from "./slices/reserveSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    user: userReducer,
    order: orderSlice,
    reserve: reserveSlice,
  },
});
Modal.setAppElement("#root");
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
