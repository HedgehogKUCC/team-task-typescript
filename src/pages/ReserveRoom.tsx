import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import SizeIcon from "/ic_Size.svg";
import BedIcon from "/ic_Bed.svg";
import PersonIcon from "/ic_Person.svg";
import CheckIcon from "/ic_check_primary.svg";
import ZipCodes from "../utils/zipcodes";
import { useRef, useState } from "react";
import ZipCodeMap from "../utils/zipcodes";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingModal from "../components/ReserveLoadingModal";
import EditRoomModal from "../components/EditRoomTypeModal";
import React, { useEffect } from "react";
import { apiGetRoom } from "../api/apiRoom";
import { apiAddOrder } from "../api/apiOrder";
import type { Room } from "../api/interface/room";
import type { IOderForm } from "../api/interface/orders";
import type { IApiUserResult } from "../api/interface/user";

import { useAppSelector, useAppDispatch } from "../store/hook";
import { selectUser } from "../store/slices/userSlice";
import { selectReserve } from "../store/slices/reserveSlice";

import { setOrder } from "../store/slices/orderSlice";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { zhTW } from "date-fns/locale";

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

  const reserveStore = useAppSelector(selectReserve);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dateRangeRef = useRef<HTMLDivElement | null>(null);
  //日期選擇器
  const [selectDate, setSelectDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);
  const [isSelectDateOpen, setIsSelectDateOpen] = useState(false); //日期選擇器是否開啟
  const [selectCounty, setSelectCounty] = useState<string>("--請選擇縣市--"); //選擇縣市
  const [selectCity, setSelectCity] = useState<string>("--請選擇區域--"); //選擇區域
  const [cities, setCities] = useState<string[]>([]); //區域資料
  const [selectZipcode, setZipcode] = useState<number>(); //郵遞區號
  const [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState<Room>();
  const [postData, setPostData] = useState<IOderForm>();
  const [isApplyUserData, setIsApplyUserData] = useState<boolean>(false); //是否套用會員資料
  const [selectRoomId, setSelectRoomId] = useState<string>(""); //選擇房型id
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [reservePeople, setReservePeople] = useState<number>(2); //訂房人數
  const [isOpenEditReservePeople, setIsOpenEditReservePeople] =
    useState<boolean>(false);
  const [roomNights, setRoomNights] = useState<number>(1); //訂房天數
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const countyArray = ZipCodes.map((item) => item.county);
  const allCounty = Array.from(new Set(countyArray));
  const user = useAppSelector(selectUser);
  //房間格局
  const roomLayout = ["市景", "獨立衛浴", "客廳", "客房", "樓層電梯"];
  const options = [1, 2, 3, 4];

  const ROOM_ID = selectRoomId || reserveStore.roomId;

  // 第一次載入頁面時，取得房間資料
  useEffect(() => {
    document.documentElement.scrollTop = 0;

    setSelectDate([
      {
        startDate: new Date(reserveStore.startDate),
        endDate: new Date(reserveStore.endDate),
        key: "selection",
      }
    ]);
    setReservePeople(reserveStore.people);

  }, []);

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
  //編輯人數
  const handleChangePeople = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setReservePeople(event.target.value as unknown as number);
  };
  //日期格式化
  const formattedDate = (date: Date) => {
    return date
      .toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "-");
  };
  //用於顯示訂房日期
  const showFormattedDate = (date: Date) => {
    return date.toLocaleDateString("zh-TW", {
      month: "long",
      day: "numeric",
      weekday: "long",
    });
  };
  //計算訂房天數
  const calculateNights = (startDate: Date, endDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // 每天的毫秒數
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / oneDay);
    return diffDays;
  };

  useEffect(() => {
    //取得房間資料
    const getRoomData = async () => {
      const res = await apiGetRoom(ROOM_ID);
      if (res) {
        setRoomData(res.result);
      }
    };
    getRoomData();
    setRoomNights(
      calculateNights(selectDate[0].startDate, selectDate[0].endDate) !== 0
        ? calculateNights(selectDate[0].startDate, selectDate[0].endDate)
        : 1,
    );
  }, [selectRoomId, selectDate, roomNights, selectCity]);

  //計算總價格
  useEffect(() => {
    if (roomData) {
      const price = roomData.price * roomNights;
      setTotalPrice(price);
    }
  }, [totalPrice, roomNights, roomData]);

  //套用會員資料
  const setUserData = () => {
    if (user.user) {
      const IuserData: IApiUserResult = user.user.result;
      const { name, phone, email, address } = IuserData;
      //套用會員資料 並設定表單資料 主要用於顯示 --start
      setValue("userInfo.name", name);
      setValue("userInfo.phone", phone);
      setValue("userInfo.email", email);
      setValue("userInfo.address.detail", address.detail);
      setZipcode(address.zipcode);
      setSelectCity(address.city);
      setSelectCounty(address.county);
      //套用會員資料 並設定表單資料 --end
      console.log("selectCity", selectCity);
    } else {
      return;
    }
  };

  //送出訂單
  const onSubmit: SubmitHandler<IOderForm> = (data) => {
    setLoading(true);

    const postForm: IOderForm = {
      roomId: ROOM_ID,
      checkInDate: formattedDate(selectDate[0].startDate), //存入store
      checkOutDate: formattedDate(selectDate[0].endDate), // 存入store
      peopleNum: reservePeople, //存入store
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
    if (postForm.checkInDate === postForm.checkOutDate) {
      //若入住日期與退房日期相同，則退房日期加一天
      postForm.checkOutDate = formattedDate(
        new Date(
          new Date(postForm.checkOutDate).getTime() + 24 * 60 * 60 * 1000,
        ),
      );
    }
    setPostData(postForm);
    if (postForm) {
      apiAddOrder(postForm).then((res) => {
        if (res) {
          dispatch(setOrder(res));
        }
      });
    }
    // 3秒後跳轉至訂單成功頁面 並清空postData 與 loading
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

  const goBeforePage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(`/room_detail/${ROOM_ID}`, { replace: true });
  };

  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section className="bg_primary_10 text-black py-7 py-md-9">
        <div className="container">
          <LoadingModal isLoading={loading} />
          <EditRoomModal
            openModal={editModalOpen}
            setOpenModal={setEditModalOpen}
            setSelectRoomId={setSelectRoomId}
            currentRoomId={selectRoomId}
          ></EditRoomModal>
          <div className="d-flex align-items-center  mb-7">
            <a href="#" onClick={goBeforePage}>
              <i
                className="bi bi-chevron-left text-black fw-bold me-2"
                style={{ fontSize: "40px" }}
              ></i>
            </a>
            <h2 className="fw-bold">確認訂房資訊</h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row justify-content-between"
          >
            <div className="col-lg-7">
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
                  <p>{roomData && roomData?.name}</p>
                </div>
                <button
                  type="button"
                  className="fw-bold btn text-decoration-underline"
                  onClick={() => setEditModalOpen(true)}
                >
                  編輯
                </button>
              </div>
              {/* 訂房日期 */}
              <div
                className="d-flex justify-content-between align-items-center mb-4"
                style={{ position: "relative" }}
              >
                <div>
                  <h4
                    className="fw-bold fs-6 border-left-primary-4"
                    style={{ paddingLeft: "12px" }}
                  >
                    訂房日期
                  </h4>
                  <p className="mb-0">
                    入住:{showFormattedDate(selectDate[0].startDate)}
                  </p>
                  <p>退房:{showFormattedDate(selectDate[0].endDate)}</p>
                </div>
                {!isSelectDateOpen && (
                  <button
                    type="button"
                    className="fw-bold btn text-decoration-underline"
                    onClick={() => setIsSelectDateOpen(true)}
                  >
                    編輯
                  </button>
                )}
                {isSelectDateOpen && (
                  <button
                    type="button"
                    onClick={() => setIsSelectDateOpen(false)}
                    className=" fw-bold btn btn-outline-primary  text-decoration-underline "
                  >
                    確定
                  </button>
                )}
                {isSelectDateOpen && (
                  <div
                    ref={dateRangeRef}
                    style={{ position: "absolute", top: "25px", left: "0px" }}
                  >
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) =>
                        setSelectDate([
                          {
                            startDate: item.selection.startDate || new Date(),
                            endDate:
                              item.selection.endDate ||
                              new Date(
                                new Date().getTime() + 24 * 60 * 60 * 1000,
                              ),
                            key: "selection",
                          },
                        ])
                      }
                      moveRangeOnFirstSelection={false}
                      ranges={selectDate}
                      locale={zhTW}
                      minDate={new Date()}
                    />
                  </div>
                )}
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
                  {isOpenEditReservePeople && (
                    <select
                      value={reservePeople}
                      onChange={handleChangePeople}
                      className="form-select py-1"
                      style={{ width: "100px", textAlign: "center" }}
                    >
                      {options.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="text-center"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                  {!isOpenEditReservePeople && (
                    <p className="mb-0">{reservePeople} 人</p>
                  )}
                </div>
                {!isOpenEditReservePeople && (
                  <button
                    type="button"
                    className="fw-bold btn text-decoration-underline"
                    onClick={() => setIsOpenEditReservePeople(true)}
                  >
                    編輯
                  </button>
                )}
                {isOpenEditReservePeople && (
                  <button
                    type="button"
                    onClick={() => setIsOpenEditReservePeople(false)}
                    className=" fw-bold btn btn-outline-primary  text-decoration-underline "
                  >
                    確定
                  </button>
                )}
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
                      {!user.user && <option value="">-- 請選擇縣市 --</option>}
                      {user.user && (
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
                      {!user.user && (
                        <option value="123">-- 請選擇地區 --</option>
                      )}
                      {user.user && (
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
                    <p className="fw-bold">{roomData && roomData?.areaInfo}</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 me-3 square_97">
                    <img
                      className="mb-2"
                      src={BedIcon}
                      alt="Bed Icon"
                      style={{ fontSize: "24px" }}
                    />
                    <p className="fw-bold">{roomData && roomData?.bedInfo}</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 square_97">
                    <img
                      className="mb-2"
                      src={PersonIcon}
                      alt="Person Icon"
                      style={{ fontSize: "24px" }}
                    />
                    <p className="fw-bold">1-{roomData && roomData?.maxPeople}人</p>
                  </div>
                </div>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  房間格局
                </h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2">
                  {roomLayout.map((item, index) => (
                    <span
                      className="d-flex align-items-center me-7"
                      style={{ width: "100px" }}
                      key={index}
                    >
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">{item}</p>
                    </span>
                  ))}
                </div>
                <h4
                  className="fw-bold fs-6 border-left-primary-4 my-4"
                  style={{ paddingLeft: "12px" }}
                >
                  房內設備
                </h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2">
                  {roomData?.facilityInfo && roomData?.facilityInfo.map(
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
                  {roomData?.amenityInfo && roomData?.amenityInfo.map(
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
                  src={roomData && roomData?.imageUrl}
                  alt="room"
                />
                <h4 className="fs-28 fw-bold mb-5">價格詳情</h4>
                <div className="d-flex justify-content-between ">
                  <p>
                    NT$ {roomData && roomData?.price}
                    <span className="px-2">X</span>
                    {roomNights}晚
                  </p>
                  <p>NT$ {totalPrice.toLocaleString("en-US")}</p>
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
                  <p className="fw-bold">
                    NT$ {(totalPrice - 1000).toLocaleString("en-US")}
                  </p>
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
