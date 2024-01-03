import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
