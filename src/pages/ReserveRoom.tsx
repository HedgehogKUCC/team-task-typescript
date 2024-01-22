import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import SizeIcon from "/ic_Size.svg";
import BedIcon from "/ic_Bed.svg";
import PersonIcon from "/ic_Person.svg";
import CheckIcon from "/ic_check_primary.svg";
import ZipCodes from "../utils/zipcodes";
import { useState } from "react";
import ZipCodeMap from "../utils/zipcodes";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingModal from "../components/ReserveLoadingModal";
import React, { useEffect } from "react";
import { apiGetRoom } from "../api/apiRoom";
import { apiAddOrder } from "../api/apiOrder";
import type { Room } from "../api/interface/room";
import type { IOderForm } from "../api/interface/orders";
import type { IApiUserResult } from "../api/interface/user";
import { useAppSelector } from "../store/hook";
import { selectUser } from "../store/slices/userSlice";
import { setOrder } from "../store/slices/orderSlice";
import { useAppDispatch } from "../store/hook";

const ReserveRoom = () => {
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

  interface IFormInputs {
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    peopleNum: number;
    userInfo: UserInfo;
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [selectCounty, setSelectCounty] = useState<string>(""); //選擇縣市
  const [selectCity, setSelectCity] = useState<string>(""); //選擇區域
  const [cities, setCities] = useState<string[]>([]); //區域資料
  const [selectZipcode, setZipcode] = useState<number>(); //郵遞區號
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState<Room>();
  const [postData, setPostData] = useState<IOderForm>();
  const [isApplyUserData, setIsApplyUserData] = useState<boolean>(false); //是否套用會員資料
  const user = useAppSelector(selectUser);

  const countyArray = ZipCodes.map((item) => item.county);
  const allCounty = Array.from(new Set(countyArray));

  //選擇縣市後，取得區域資料
  const handleChangeCounty = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCounty(e.target.value);
    const cities: string[] = [];

    ZipCodeMap.filter((item) => {
      if (item.county === e.target.value) {
        cities.push(item.city);
        setCities(cities);
      }
    });
  };

  //選擇區域後，取得郵遞區號
  const handleChangeCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectCity(e.target.value);
    if (selectCounty) {
      const findZipCode = ZipCodeMap.find(
        (item) => item.county === selectCounty && item.city === e.target.value,
      );
      if (findZipCode) {
        setZipcode(findZipCode.zipcode);
      }
    }
  };

  //取得房間資料
  const getRoomData = async () => {
    const res = await apiGetRoom("6597f7f8c9e6ae814611a455");
    if (res) {
      setRoomData(res.result);
    }
  };

  useEffect(() => {
    getRoomData();
  }, []);

  //套用會員資料
  const setUserData = () => {
    //當使用套用會員資料時，將會員資料存入postData 主要用於送出訂單 --start
    setIsApplyUserData(true);
    if (user.user) {
      const IuserData: IApiUserResult = user.user.result;
      const { name, phone, email, address } = IuserData;

      const data: IOderForm = {
        roomId: "6597f7f8c9e6ae814611a455", //可從路徑取得 或 存入store
        checkInDate: "2024/01/19", //存入store
        checkOutDate: "2024/01/20", // 存入store
        peopleNum: 2, //存入store
        userInfo: {
          address: {
            zipcode: address.zipcode,
            detail: address.detail,
          },
          name,
          phone,
          email,
        },
      };
      setPostData(data);
      //當使用套用會員資料時，將會員資料存入postData 主要用於送出訂單 --end

      //套用會員資料 並設定表單資料 主要用於顯示 --start
      setValue("userInfo.name", name);
      setValue("userInfo.phone", phone);
      setValue("userInfo.email", email);
      setValue("userInfo.address.detail", address.detail);
      setZipcode(address.zipcode);
      setSelectCity(address.city);
      setSelectCounty(address.county);
      //套用會員資料 並設定表單資料 --end
    } else {
      return;
    }
  };

  //送出訂單
  const onSubmit: SubmitHandler<IOderForm> = (data) => {
    setLoading(true);
    if (isApplyUserData) {
      if (postData)
        //當使用套用會員資料時，postData 已經有資料，直接送出
        apiAddOrder(postData).then((res) => {
          if (res) {
            dispatch(setOrder(res));
          }
        });
    } else {
      //當沒有使用套用會員資料時，postData 為空，需自行填寫資料後送出
      const postForm: IOderForm = {
        roomId: "6597f7f8c9e6ae814611a455", //可從路徑取得 或 存入store
        checkInDate: "2024/01/19", //存入store
        checkOutDate: "2024/01/20", // 存入store
        peopleNum: 2, //存入store
        userInfo: {
          address: {
            zipcode: selectZipcode ? selectZipcode : 0,
            detail: data.userInfo.address.detail,
          },
          name: data.userInfo.name,
          phone: data.userInfo.phone,
          email: data.userInfo.email,
        },
      };
      setPostData(postForm);
      if (postForm) {
        apiAddOrder(postForm).then((res) => {
          if (res) {
            dispatch(setOrder(res));
          }
        });
      }
    }
    //3秒後跳轉至訂單成功頁面 並清空postData 與 loading
    setTimeout(() => {
      //傳遞訂單資料至訂單成功頁面
      navigate("/reserve_success");
      setPostData(undefined);
      setLoading(false);
    }, 3000);
  };

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<IFormInputs>();

  //formValues 為表單資料
  const formValues = watch();

  //當表單資料與postData不同時，將isApplyUserData 設為false
  //，避免使用者修改表單資料後，再次套用會員資料
  useEffect(() => {
    if (formValues.userInfo !== postData?.userInfo) {
      setIsApplyUserData(false);
    } else {
      setIsApplyUserData(true);
    }
  }, [formValues, postData, loading, isApplyUserData]);
  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section className="bg_primary_10 text-black py-7 py-md-9">
        <div className="container">
          <LoadingModal isLoading={loading} />

          <div className="d-flex align-items-center  mb-7">
            <Link to="/">
              <i
                className="bi bi-chevron-left text-black fw-bold me-2"
                style={{ fontSize: "40px" }}
              ></i>
            </Link>
            <h2 className="fw-bold">確認訂房資訊</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row justify-content-between"
          >
            <div className="col-md-7">
              <h3 className="fw-bold fs-28 mb-7">訂房資訊</h3>
              {/* 選擇房型 */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className=" ">
                  <h4
                    className="fw-bold fs-6 border-left-primary-4"
                    style={{ paddingLeft: "12px" }}
                  >
                    選擇房型
                  </h4>
                  <p>景觀雙人房</p>
                </div>
                <button
                  type="button"
                  className="fw-bold btn text-decoration-underline"
                >
                  編輯
                </button>
              </div>
              {/* 訂房日期 */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4
                    className="fw-bold fs-6 border-left-primary-4"
                    style={{ paddingLeft: "12px" }}
                  >
                    訂房日期
                  </h4>
                  <p className="mb-0">入住：6 月 10 日星期二</p>
                  <p>退房：6 月 11 日星期三</p>
                </div>
                <button
                  type="button"
                  className="fw-bold btn text-decoration-underline"
                >
                  編輯
                </button>
              </div>
              {/* 房客人數 */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4
                    className="fw-bold fs-6 border-left-primary-4"
                    style={{ paddingLeft: "12px" }}
                  >
                    房客人數
                  </h4>
                  <p className="mb-0">2 人</p>
                </div>
                <button
                  type="button"
                  className="fw-bold btn text-decoration-underline"
                >
                  編輯
                </button>
              </div>

              <div
                style={{ margin: "48px 0", border: "1px solid #909090" }}
              ></div>

              {/* 訂房人資訊 */}
              <div className="d-flex justify-content-between align-items-center mb-7">
                <h3 className="fw-bold fs-28">訂房人資訊</h3>
                <button
                  type="button"
                  className="btn text-decoration-underline text-primary"
                  onClick={setUserData}
                >
                  套用會員資料
                </button>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="fw-bold mb-2">
                  姓名
                </label>
                <input
                  id="name"
                  className={`form-control ${
                    errors.userInfo?.name && "is-invalid border-3"
                  }`}
                  type="text"
                  placeholder="請輸入姓名"
                  {...register("userInfo.name", {
                    required: {
                      value: true,
                      message: "姓名 必填",
                    },
                    pattern: {
                      value: /^[\u4e00-\u9fa5a-zA-Z]{2,}$/g,
                      message: "姓名 只能中文和英文，最少兩個字",
                    },
                  })}
                />
                {errors.userInfo?.name && (
                  <div className="invalid-feedback">
                    {errors.userInfo.name.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="fw-bold mb-2">
                  手機號碼
                </label>
                <input
                  type="tel"
                  className={`form-control ${
                    errors.userInfo?.phone && "is-invalid border-3"
                  }`}
                  id="phone"
                  placeholder="請輸入手機號碼"
                  {...register("userInfo.phone", {
                    required: {
                      value: true,
                      message: "手機號碼 必填",
                    },
                    pattern: {
                      value: /^09\d{8}$/g,
                      message: "手機號碼 格式有誤",
                    },
                  })}
                />
                {errors.userInfo?.phone && (
                  <div className="invalid-feedback">
                    {errors.userInfo?.phone.message}
                  </div>
                )}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="fw-bold mb-2">
                  電子信箱
                </label>
                <input
                  id="email"
                  className={`form-control ${
                    errors.userInfo?.email && "is-invalid border-3"
                  }`}
                  type="email"
                  placeholder="請輸入電子信箱"
                  {...register("userInfo.email", {
                    required: {
                      value: true,
                      message: "電子郵件 必填",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "電子郵件 格式有誤",
                    },
                  })}
                />
                <div className="invalid-feedback">
                  {errors.userInfo?.email?.message}
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="fw-bold mb-2">
                  地址
                </label>
                <div className="d-flex">
                  <div className="w-100 me-3 mb-4">
                    <select
                      className="form-select"
                      value={selectCounty}
                      onChange={handleChangeCounty}
                    >
                      {!postData && <option value="">-- 請選擇縣市 --</option>}
                      {postData && (
                        <option value={selectCounty}>{selectCounty}</option>
                      )}
                      {allCounty.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-100">
                    <select
                      className="form-select"
                      value={selectCity}
                      onChange={handleChangeCity}
                    >
                      {!postData && <option value="">-- 請選擇地區 --</option>}
                      {postData && (
                        <option value={selectCity}>{selectCity}</option>
                      )}
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    className={`form-control ${
                      errors.userInfo?.address?.detail && "is-invalid border-3"
                    }`}
                    placeholder="請輸入詳細地址"
                    {...register("userInfo.address.detail", {
                      required: {
                        value: true,
                        message: "詳細地址 必填",
                      },
                      pattern: {
                        value: /^[\u4e00-\u9fa5a-zA-Z\d]{1,}$/g,
                        message: "詳細地址 只能中文、英文和數字",
                      },
                    })}
                  />
                  {errors.userInfo?.address?.detail && (
                    <div className="invalid-feedback">
                      {errors.userInfo?.address?.detail.message}
                    </div>
                  )}
                </div>
                <div
                  style={{ margin: "48px 0", border: "1px solid #909090" }}
                ></div>

                <h3 className="fw-bold fs-28 mb-7">房間資訊</h3>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  房型基本資訊
                </h4>
                <div className="d-flex">
                  <div className=" rounded-8 bg-white p-3 me-3 square_97">
                    <img
                      className="mb-2"
                      src={SizeIcon}
                      alt="Size Icon"
                      style={{ fontSize: "24px" }}
                    />
                    <p className="fw-bold">{roomData?.areaInfo}</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 me-3 square_97">
                    <img
                      className="mb-2"
                      src={BedIcon}
                      alt="Bed Icon"
                      style={{ fontSize: "24px" }}
                    />
                    <p className="fw-bold">{roomData?.bedInfo}</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 square_97">
                    <img
                      className="mb-2"
                      src={PersonIcon}
                      alt="Person Icon"
                      style={{ fontSize: "24px" }}
                    />
                    <p className="fw-bold">1-{roomData?.maxPeople}人</p>
                  </div>
                </div>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  房間格局
                </h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2">
                  <span
                    className="d-flex align-items-center me-7"
                    style={{ width: "100px" }}
                  >
                    <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                    <p className="mb-0">市景</p>
                  </span>
                  <span
                    className="d-flex align-items-center me-7"
                    style={{ width: "100px" }}
                  >
                    <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                    <p className="mb-0">獨立衛浴</p>
                  </span>
                  <span
                    className="d-flex align-items-center me-7"
                    style={{ width: "100px" }}
                  >
                    <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                    <p className="mb-0">客廳</p>
                  </span>
                </div>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  房內設備
                </h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2">
                  {roomData?.facilityInfo.map(
                    (item, index) =>
                      item.isProvide && (
                        <span
                          className="d-flex align-items-center me-7"
                          style={{ width: "100px" }}
                          key={index}
                        >
                          <img
                            className="pe-2"
                            src={CheckIcon}
                            alt="Check Icon"
                          />
                          <p className="mb-0">{item.title}</p>
                        </span>
                      ),
                  )}
                </div>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  備品提供
                </h4>

                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2">
                  {roomData?.amenityInfo.map(
                    (item, index) =>
                      item.isProvide && (
                        <span
                          className="d-flex align-items-center me-7"
                          style={{ width: "100px" }}
                          key={index}
                        >
                          <img
                            className="pe-2"
                            src={CheckIcon}
                            alt="Check Icon"
                          />
                          <p className="mb-0">{item.title}</p>
                        </span>
                      ),
                  )}
                </div>
              </div>
            </div>
            <div className="col">
              <div className="rounded-20 p-7 bg-white">
                <img
                  className="object-fit-cover mb-7 rounded-8"
                  src={roomData?.imageUrl}
                  alt="room"
                />
                <h4 className="fs-28 fw-bold">價格詳情</h4>
                <div className="d-flex justify-content-between">
                  <p>NT$ 10,000 X 2 晚</p>
                  <p>NT$ 20,000</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>住宿折扣</p>
                  <p className="text-primary">-NT$ 1,000</p>
                </div>

                <div
                  style={{ margin: "24px 0", border: "1px solid #909090" }}
                ></div>

                <div className="d-flex justify-content-between">
                  <p className="fw-bold">總價</p>
                  <p className="fw-bold">NT$ 19,000</p>
                </div>
                <button
                  type="submit"
                  className="mt-7 btn btn-primary text-white w-100"
                >
                  確認房價
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReserveRoom;
