export interface IApiUserLoginResponseData {
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

export interface IApiUserResult {
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
}
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