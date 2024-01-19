import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
interface IApiUserLoginResponseData {
  status: boolean;
  token: string;
  result: {
    address: {
      zipcode: number;
      detail: string;
      county: string;
      city: string;
    };
    id: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
}
export interface UserState {
  name: string;
  token: string;
  user: IApiUserLoginResponseData | null;
}

const initialState: UserState = {
  name: "",
  token: "",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setUserData: (state, action: PayloadAction<IApiUserLoginResponseData>) => {
      state.user = action.payload;
      console.log(state.user);
    },
  },
});

export const { setName, setToken, setUserData } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
