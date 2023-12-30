import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import signUpReducer from "./slices/signUpSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
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
