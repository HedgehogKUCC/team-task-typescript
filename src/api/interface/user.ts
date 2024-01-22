export interface IApiUserUpdateData {
  userId: string;
  name: string;
  phone: string;
  birthday: string;
  birthdayYear: number | "";
  birthdayMonth: number | "";
  birthdayDate: number | "";
  address: {
    zipcode: number;
    detail: string;
    county: string;
    city: string;
  };
  oldPassword: string;
  newPassword: string;
  checkNewPassword: string;
}
