import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import ZipCodeMap from "../utils/zipcodes";

import { IApiUserUpdateData } from "../api/interface/user.ts";
import { apiUserData, apiUserUpdate } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const MemberInfo = () => {
  // 使用者資料
  interface IUserData {
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
  const [userData, setUserData] = useState<IUserData>({} as IUserData);

  const getUserData = async () => {
    const res = await apiUserData();
    if (res.data.status) {
      setUserData(res.data.result);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // 修改資料
  const [isPasswordEditMode, setIsPasswordEditMode] = useState(false);
  const [isOtherDataEditMode, setIsOtherDataEditMode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
    setValue,
    setError,
  } = useForm<IApiUserUpdateData>({
    mode: "onTouched",
  });

  useEffect(() => {
    setValue("userId", userData._id);
    setValue("name", userData.name);
    setValue("phone", userData.phone);
    setValue("birthday", userData.birthday);
    setValue("birthdayYear", new Date(userData.birthday).getFullYear());
    setValue("birthdayMonth", new Date(userData.birthday).getMonth() + 1);
    setValue("birthdayDate", new Date(userData.birthday).getDate());
    setValue("address.zipcode", userData.address?.zipcode);
    setValue("address.county", userData.address?.county);
    setValue("address.city", userData.address?.city);
    setValue("address.detail", userData.address?.detail);
  }, [userData]);

  const onSubmit = (data: IApiUserUpdateData) => {
    // 判斷新密碼和確認新密碼值是否一致
    if (data.newPassword !== data.checkNewPassword) {
      setError("checkNewPassword", {
        type: "manual",
        message: "密碼不一致",
      });
      return;
    }

    (async () => {
      try {
        const res = await apiUserUpdate(data);
        if (res.data.status) {
          await MySwal.fire({
            text: "儲存成功",
            icon: "success",
            showConfirmButton: false,
            timer: 1200,
          });

          setIsPasswordEditMode(false);
          setIsOtherDataEditMode(false);
          getUserData();
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        MySwal.fire({
          text: error.response.data.message,
          icon: "error",
          showConfirmButton: false,
          timer: 1200,
        });
      }
    })();
  };

  // 生日下拉選單資料
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (_, index) => 1900 + index,
  );
  const months = Array.from({ length: 12 }, (_, index) => index + 1);
  const dates = Array.from({ length: 31 }, (_, index) => index + 1);

  // 地址下拉選單資料
  interface ICity {
    detail: string;
    zipcode: number;
    county: string;
    city: string;
  }

  // 縣市
  const counties = [...new Set(ZipCodeMap.map((item) => item.county))];

  // 區域
  let cities: ICity[] = [];
  const setCityList = () => {
    cities = ZipCodeMap.filter((item) => {
      return item.county === getValues().address?.county;
    });
  };
  setCityList();

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "address.county") {
        setValue("address.city", "");
        setCityList();
      }
      if (name === "address.city") {
        const zipcode = ZipCodeMap.find(
          (item) => item.city === value.address?.city,
        )?.zipcode;
        if (typeof zipcode === "number") {
          setValue("address.zipcode", zipcode);
        }
      }
      if (
        name === "birthdayYear" ||
        name === "birthdayMonth" ||
        name === "birthdayDate"
      ) {
        setValue(
          "birthday",
          `${value.birthdayYear}/${value.birthdayMonth}/${value.birthdayDate}`,
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [setValue, watch]);

  return (
    <>
      <div className="row">
        {/* 修改密碼 */}
        <div className="col-12 col-sm-6 col-md-5">
          <div
            className="bg-white p-5 p-sm-6 p-md-7 mb-5"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-5 mb-sm-7">修改密碼</h5>
            {isPasswordEditMode ? (
              // 編輯表單
              <form>
                {/* 電子信箱 */}
                <div className="mb-3 mb-sm-5">
                  <label className="form-label text-gray-dark">電子信箱</label>
                  <div className="text-black fw-bold text-break">
                    {userData.email}
                  </div>
                </div>

                {/* 舊密碼 */}
                <div className="mb-3 mb-sm-5">
                  <label
                    htmlFor="oldPassword"
                    className="form-label text-black fw-bold"
                  >
                    舊密碼
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.oldPassword && "is-invalid"
                    }`}
                    id="oldPassword"
                    placeholder="請輸入舊密碼"
                    autoComplete="current-password"
                    {...register("oldPassword", {
                      required: {
                        value: true,
                        message: "舊密碼 必填",
                      },
                    })}
                  />
                  {errors.oldPassword && (
                    <div className="invalid-feedback">
                      {errors.oldPassword.message}
                    </div>
                  )}
                </div>

                {/* 新密碼 */}
                <div className="mb-3 mb-sm-5">
                  <label
                    htmlFor="newPassword"
                    className="form-label text-black fw-bold"
                  >
                    新密碼
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.newPassword && "is-invalid"
                    }`}
                    id="newPassword"
                    placeholder="請輸入新密碼"
                    autoComplete="new-password"
                    {...register("newPassword", {
                      required: {
                        value: true,
                        message: "新密碼 必填",
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
                        message: "密碼需至少 8 碼以上，並英數混合",
                      },
                    })}
                  />
                  {errors.newPassword && (
                    <div className="invalid-feedback">
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>

                {/* 確認新密碼 */}
                <div className="mb-5 mb-sm-7">
                  <label
                    htmlFor="checkNewPassword"
                    className="form-label text-black fw-bold"
                  >
                    確認新密碼
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.checkNewPassword && "is-invalid"
                    }`}
                    id="checkNewPassword"
                    placeholder="請再輸入一次新密碼"
                    autoComplete="new-password"
                    {...register("checkNewPassword", {
                      required: {
                        value: true,
                        message: "確認新密碼 必填",
                      },
                    })}
                  />
                  {errors.checkNewPassword && (
                    <div className="invalid-feedback">
                      {errors.checkNewPassword.message}
                    </div>
                  )}
                </div>

                <Button
                  text="儲存設定"
                  btnType="primary"
                  isDisabled={!isValid}
                  onClick={handleSubmit(onSubmit)}
                />
              </form>
            ) : (
              // 檢視表單
              <form>
                <div className="mb-3 mb-sm-5">
                  <label className="form-label text-gray-dark">電子信箱</label>
                  <div className="text-black fw-bold text-break">
                    {userData.email}
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <label className="form-label text-gray-dark">密碼</label>
                    <div className="text-black fw-bold">⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁</div>
                  </div>
                  <Button
                    text="重設"
                    btnType="text"
                    onClick={() => setIsPasswordEditMode(true)}
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 基本資料 */}
        <div className="col-12 col-sm-6 col-md-7">
          <div
            className="bg-white p-5 p-sm-6 p-md-7"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-5 mb-sm-7">基本資料</h5>
            {isOtherDataEditMode ? (
              // 編輯表單
              <form>
                {/* 姓名 */}
                <div className="mb-3 mb-sm-5">
                  <label
                    htmlFor="name"
                    className="form-label text-black fw-bold"
                  >
                    姓名
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name && "is-invalid"}`}
                    id="name"
                    placeholder="請輸入姓名"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "姓名 必填",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                {/* 手機號碼 */}
                <div className="mb-3 mb-sm-5">
                  <label
                    htmlFor="phone"
                    className="form-label text-black fw-bold"
                  >
                    手機號碼
                  </label>
                  <input
                    type="tel"
                    className={`form-control ${errors.phone && "is-invalid"}`}
                    id="phone"
                    placeholder="請輸入手機號碼"
                    {...register("phone", {
                      required: {
                        value: true,
                        message: "手機號碼 必填",
                      },
                    })}
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">
                      {errors.phone.message}
                    </div>
                  )}
                </div>

                {/* 生日 */}
                <div className="mb-3 mb-sm-5">
                  <label
                    htmlFor="birthday"
                    className="form-label text-black fw-bold"
                  >
                    生日
                  </label>
                  <div className="row g-2">
                    {/* 年份 */}
                    <div className="col-12 col-sm-4">
                      <select
                        className={`form-select me-2 ${
                          errors.birthdayYear && "is-invalid"
                        }`}
                        id="birthdayYear"
                        {...register("birthdayYear", {
                          required: {
                            value: true,
                            message: "年份 必填",
                          },
                        })}
                      >
                        <option value="" disabled>
                          -- 年份 --
                        </option>
                        {years.map((year) => (
                          <option value={year} key={year}>
                            {year} 年
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* 月份 */}
                    <div className="col-12 col-sm-4">
                      <select
                        className={`form-select me-2 ${
                          errors.birthdayMonth && "is-invalid"
                        }`}
                        id="birthdayMonth"
                        {...register("birthdayMonth", {
                          required: {
                            value: true,
                            message: "月份 必填",
                          },
                        })}
                      >
                        <option value="" disabled>
                          -- 月份 --
                        </option>
                        {months.map((month) => (
                          <option value={month} key={month}>
                            {month} 月
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* 日期 */}
                    <div className="col-12 col-sm-4">
                      <select
                        className={`form-select ${
                          errors.birthdayDate && "is-invalid"
                        }`}
                        id="birthdayDate"
                        {...register("birthdayDate", {
                          required: {
                            value: true,
                            message: "日期 必填",
                          },
                        })}
                      >
                        <option value="" disabled>
                          -- 日期 --
                        </option>
                        {dates.map((date) => (
                          <option value={date} key={date}>
                            {date} 日
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {(errors.birthdayYear ||
                    errors.birthdayMonth ||
                    errors.birthdayDate) && (
                    <div className="invalid-feedback d-block">
                      {errors.birthdayYear?.message ||
                        errors.birthdayMonth?.message ||
                        errors.birthdayDate?.message}
                    </div>
                  )}
                </div>

                {/* 地址 */}
                <div className="mb-5 mb-sm-7">
                  <label
                    htmlFor="birthday"
                    className="form-label text-black fw-bold"
                  >
                    地址
                  </label>
                  <div className="row g-2">
                    {/* 縣市 */}
                    <div className="col-12 col-sm-6">
                      <select
                        className={`form-select me-2 ${
                          errors.address?.county && "is-invalid"
                        }`}
                        id="address.county"
                        {...register("address.county", {
                          required: {
                            value: true,
                            message: "縣市 必填",
                          },
                        })}
                      >
                        <option value="" disabled>
                          -- 縣市 --
                        </option>
                        {counties.map((county) => (
                          <option value={county} key={county}>
                            {county}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 區域 */}
                    <div className="col-12 col-sm-6">
                      <select
                        className={`form-select me-2 ${
                          errors.address?.city && "is-invalid"
                        }`}
                        id="address.city"
                        {...register("address.city", {
                          required: {
                            value: true,
                            message: "區域 必填",
                          },
                        })}
                      >
                        <option value="" disabled>
                          -- 區域 --
                        </option>
                        {cities.map((city) => (
                          <option
                            value={city.city}
                            key={city.zipcode + city.city}
                          >
                            {city.city}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 詳細地址 */}
                    <div className="col-12">
                      <input
                        type="text"
                        className={`form-control ${
                          errors.address?.detail && "is-invalid"
                        }`}
                        id="address?.detail"
                        placeholder="請輸入詳細地址"
                        {...register("address.detail", {
                          required: {
                            value: true,
                            message: "詳細地址 必填",
                          },
                        })}
                      />
                      {(errors.address?.city || errors.address?.detail) && (
                        <div className="invalid-feedback d-block">
                          {errors.address?.city?.message ||
                            errors.address?.detail?.message}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Button
                  text="儲存設定"
                  btnType="primary"
                  isDisabled={!isValid}
                  onClick={handleSubmit(onSubmit)}
                />
              </form>
            ) : (
              // 檢視表單
              <form>
                <div className="mb-3 mb-sm-5">
                  <label className="form-label text-gray-dark">姓名</label>
                  <div className="text-black fw-bold">{userData.name}</div>
                </div>
                <div className="mb-3 mb-sm-5">
                  <label className="form-label text-gray-dark">手機號碼</label>
                  <div className="text-black fw-bold">{userData.phone}</div>
                </div>
                <div className="mb-3 mb-sm-5">
                  <label className="form-label text-gray-dark">生日</label>
                  <div className="text-black fw-bold">
                    {new Date(userData.birthday).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <div className="mb-5 mb-sm-7">
                  <label className="form-label text-gray-dark">地址</label>
                  <div className="text-black fw-bold">
                    {userData.address?.zipcode} {userData.address?.county}
                    {userData.address?.city}
                    {userData.address?.detail}
                  </div>
                </div>
                <Button
                  text="編輯"
                  btnType="secondary"
                  onClick={() => setIsOtherDataEditMode(true)}
                />
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
