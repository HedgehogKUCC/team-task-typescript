import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";

export type ReserveState = {
  roomId: string;
  startDate: string;
  endDate: string;
  people: number;
}

const initialState: ReserveState = {
  roomId: "",
  startDate: "",
  endDate: "",
  people: 0
};

export const reserveSlice = createSlice({
  name: "reserve",
  initialState,
  reducers: {
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
    },
    setEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setPeople: (state, action: PayloadAction<number>) => {
      state.people = action.payload;
    },
  },
});

export const { setRoomId, setStartDate, setEndDate, setPeople } = reserveSlice.actions;

export const selectReserve = (state: RootState) => state.reserve;

export default reserveSlice.reducer;