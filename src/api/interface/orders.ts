export interface IOrder {
  status: boolean;
  result: Order;
}
export interface Order {
  userInfo: UserInfo;
  _id: string;
  roomId: Room;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  orderUserId: string;
  status: number;
  createdAt: string;
  updatedAt: string;
}

interface Address {
  zipcode: number;
  detail: string;
}

interface UserInfo {
  address: Address;
  name: string;
  phone: string;
  email: string;
}

interface FacilityInfo {
  title: string;
  isProvide: boolean;
}

interface Room {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  facilityInfo: FacilityInfo[];
  amenityInfo: FacilityInfo[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOderForm {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: UserInfo;
}
