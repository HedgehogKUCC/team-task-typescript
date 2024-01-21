import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../components/Button";

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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    setValue("address.zipcode", userData.address?.zipcode);
    setValue("address.county", userData.address?.county);
    setValue("address.city", userData.address?.city);
    setValue("address.detail", userData.address?.detail);
  });

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

  return (
    <>
      <div className="row">
        {/* 修改密碼 */}
        <div className="col-12 col-sm-6 col-md-5">
          <div
            className="bg-white p-5 p-sm-6 p-md-7 mb-5"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-7">修改密碼</h5>
            {isPasswordEditMode ? (
              // 編輯表單
              <form onSubmit={handleSubmit(onSubmit)}>
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
            <h5 className="text-black fw-bold mb-7">基本資料</h5>
            <form>
              <div className="mb-5">
                <label className="form-label text-gray-dark">姓名</label>
                <div className="text-black fw-bold">{userData.name}</div>
              </div>
              <div className="mb-5">
                <label className="form-label text-gray-dark">手機號碼</label>
                <div className="text-black fw-bold">{userData.phone}</div>
              </div>
              <div className="mb-5">
                <label className="form-label text-gray-dark">生日</label>
                <div className="text-black fw-bold">
                  {new Date(userData.birthday).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="mb-7">
                <label className="form-label text-gray-dark">地址</label>
                <div className="text-black fw-bold">
                  {userData.address?.zipcode} {userData.address?.county}
                  {userData.address?.city}
                  {userData.address?.detail}
                </div>
              </div>
              <Button text="編輯" btnType="secondary" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
