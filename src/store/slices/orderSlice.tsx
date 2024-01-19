import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../index";
import { IOrder } from "../../api/interface/orders";

const initialState: IOrder = {
  status: true,
  result: {
    userInfo: {
      address: {
        zipcode: 0,
        detail: "",
      },
      name: "",
      phone: "",
      email: "",
    },
    _id: "",
    roomId: {
      name: "",
      description: "",
      imageUrl: "",
      imageUrlList: [],
      areaInfo: "",
      bedInfo: "",
      maxPeople: 0,
      price: 0,
      status: 0,
      facilityInfo: [],
      amenityInfo: [],
      _id: "",
      createdAt: "",
      updatedAt: "",
    },
    checkInDate: "",
    checkOutDate: "",
    peopleNum: 0,
    orderUserId: "",
    status: true,
    createdAt: "",
    updatedAt: "",
  },
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<IOrder>) => {
      state = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;

export const selectOrder = (state: IOrder) => state;

export default orderSlice.reducer;
