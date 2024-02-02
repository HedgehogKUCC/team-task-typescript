import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppSelector } from "../store/hook";
import { selectSignUp } from "../store/slices/signUpSlice";

import CheckIcon from "/ic_check.svg";
import ZipCodes from "../utils/zipcodes";
import { apiUserSignUp } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IFormInputs {
  name: string;
  phone: string;
  addressDetail: string;
  checkbox: boolean;
}

interface IApiUserSignUpErrorResponseData {
  state: boolean;
  message: string;
}

const SignUpFillInfo = () => {
  const signUp = useAppSelector(selectSignUp);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [selectCounty, setSelectCounty] = useState("");
  const [selectCity, setSelectCity] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [renderDays, setRenderDays] = useState<number[]>([]);

  const Years = [];
  const StartYear = 1900;
  const CurrentYear = new Date().getFullYear();

  const Months = [];
  const StartMonth = 1;
  const EndMonth = 12;

  const Counties: string[] = [];

  for (let i = StartYear; i <= CurrentYear; i++) {
    Years.push(i);
  }

  for (let i = StartMonth; i <= EndMonth; i++) {
    Months.push(i);
  }

  ZipCodes.forEach((zipCode) => {
    if (Counties.length === 0) {
      Counties.push(zipCode.county);
    }

    if (!Counties.includes(zipCode.county)) {
      Counties.push(zipCode.county);
    }
  });

  const onChangeCountyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tempCities: string[] = [];

    setSelectCounty(e.target.value);

    ZipCodes.forEach((zipCode) => {
      if (zipCode.county === e.target.value) {
        tempCities.push(zipCode.city);
      }
    });

    setCities(tempCities);
    setSelectCity("");
  };

  const totalDays = (endDay: number): number[] => {
    const Days = [];

    for (let i = 1; i <= endDay; i++) {
      Days.push(i);
    }

    return Days;
  };

  const onChangeYearHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
    setMonth("");
    setDay("");
    setRenderDays([]);
  };

  const onChangeMonthHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
    setDay("");

    if (e.target.value === "2") {
      /* 閏年判斷
        1. 四的倍數但非 100的倍數
        2. 四百的倍數
      */
      if (
        (Number(year) % 4 === 0 && Number(year) % 100 !== 0) ||
        Number(year) % 400 === 0
      ) {
        setRenderDays(totalDays(29));
      } else {
        setRenderDays(totalDays(28));
      }
    } else if (["4", "6", "9", "11"].includes(e.target.value)) {
      setRenderDays(totalDays(30));
    } else {
      setRenderDays(totalDays(31));
    }
  };

  const backToPreviousPage = () => {
    if (signUp.email === "" || signUp.password === "") {
      navigate("/signup");
    }
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (
      selectCounty === "" ||
      selectCity === "" ||
      year === "" ||
      month === "" ||
      day === ""
    ) {
      MySwal.fire({
        text: "生日(年、月、日)或地址(縣市、地區)尚未填寫完整",
        icon: "warning",
        showConfirmButton: false,
      });
      return;
    }

    const filterItem = ZipCodes.filter(
      (item) => item.county === selectCounty,
    ).filter((item) => item.city === selectCity);

    const postData = {
      email: signUp.email,
      password: signUp.password,
      name: data.name,
      phone: data.phone,
      birthday: `${year}/${month}/${day}`,
      address: {
        zipcode: filterItem[0].zipcode,
        detail: `${data.addressDetail}`,
      },
    };

    setIsLoading(true);
    apiUserSignUp(postData)
      .then(() => {
        MySwal.fire({
          text: "註冊成功，請立即登入",
          icon: "success",
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      })
      .catch((err) => {
        MySwal.fire({
          text: (err?.response?.data as IApiUserSignUpErrorResponseData)
            ?.message,
          icon: "error",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setRenderDays(totalDays(31));
    backToPreviousPage();
  }, []);

  return (
    <div className="mx-auto pt-5 pt-xxl-1 login_signUp_form_wrap">
      <div className="d-flex flex-column">
        <p className="d-block d-sm-none mb-2 text-primary">
          享樂酒店，誠摯歡迎
        </p>
        <h1 className="mb-3">立即註冊</h1>
        <div className="mb-7 py-3 d-flex justify-content-between align-items-center">
          <div>
            <div
              style={{ width: "32px", height: "32px" }}
              className="mx-auto mb-1 d-flex justify-content-center align-items-center bg-primary rounded-circle fw-bold"
            >
              <img src={CheckIcon} alt="" />
            </div>
            <p className="mb-0">輸入信箱及密碼</p>
          </div>
          <div
            style={{ width: "188px", height: "2px" }}
            className="bg_neutral_60 d-none d-sm-block"
          ></div>
          <div
            style={{ width: "55px", height: "2px" }}
            className="bg_neutral_60 d-block d-sm-none"
          ></div>
          <div>
            <div
              style={{ width: "32px", height: "32px" }}
              className="mx-auto mb-1 d-flex justify-content-center align-items-center bg-primary rounded-circle fw-bold"
            >
              2
            </div>
            <p className="mb-0">填寫基本資料</p>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              姓名
            </label>
            <input
              type="text"
              className={`form-control ${errors.name && "is-invalid border-3"}`}
              id="name"
              placeholder="請輸入姓名"
              {...register("name", {
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
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              手機號碼
            </label>
            <input
              type="tel"
              className={`form-control ${
                errors.phone && "is-invalid border-3"
              }`}
              id="phone"
              placeholder="請輸入手機號碼"
              {...register("phone", {
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
            {errors.phone && (
              <div className="invalid-feedback">{errors.phone.message}</div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">生日</label>
            <div className="d-flex">
              <select
                className="me-2 form-select"
                value={year}
                onChange={onChangeYearHandler}
              >
                <option value="" disabled>
                  -- 年份 --
                </option>
                {Years.map((year) => (
                  <option key={year} value={year}>
                    {year}年
                  </option>
                ))}
              </select>
              <select
                className="me-2 form-select"
                value={month}
                onChange={onChangeMonthHandler}
              >
                <option value="" disabled>
                  -- 月份 --
                </option>
                {Months.map((month) => (
                  <option key={month} value={month}>
                    {month}月
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="" disabled>
                  -- 日期 --
                </option>
                {renderDays.map((day) => (
                  <option key={day} value={day}>
                    {day}日
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">地址</label>
            <div className="mb-3 d-flex">
              <select
                className="me-2 form-select"
                value={selectCounty}
                onChange={onChangeCountyHandler}
              >
                <option value="" disabled>
                  -- 請選擇縣市 --
                </option>
                {Counties.map((county) => (
                  <option key={county} value={county}>
                    {county}
                  </option>
                ))}
              </select>
              <select
                className="form-select"
                value={selectCity}
                onChange={(e) => setSelectCity(e.target.value)}
              >
                <option value="" disabled>
                  -- 請選擇地區 --
                </option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="text"
              className={`form-control ${
                errors.addressDetail && "is-invalid border-3"
              }`}
              placeholder="請輸入詳細地址"
              {...register("addressDetail", {
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
            {errors.addressDetail && (
              <div className="invalid-feedback">
                {errors.addressDetail.message}
              </div>
            )}
          </div>
          <div className="mb-7">
            <div className="form-check mb-0">
              <input
                className={`form-check-input ${
                  errors.checkbox && "is-invalid"
                }`}
                type="checkbox"
                id="rememberAccount"
                {...register("checkbox", {
                  required: {
                    value: true,
                    message: "請勾選同意本網站個資使用規範",
                  },
                })}
              />
              <label className="form-check-label" htmlFor="rememberAccount">
                我已閱讀並同意本網站個資使用規範
              </label>
              {errors.checkbox && (
                <div className="invalid-feedback">
                  {errors.checkbox.message}
                </div>
              )}
            </div>
          </div>
          <div className="mb-3">
            <button
              type="submit"
              className="py-3 btn btn-primary btn-lg w-100 fw-bold text-white"
            >
              {isLoading ? (
                <span
                  style={{ width: "1.5rem", height: "1.5rem" }}
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              ) : (
                "完成註冊"
              )}
            </button>
          </div>
        </form>
        <div className="d-flex align-items-center">
          <p className="mb-0">已經有會員了嗎？</p>
          <Link className="ms-2" to="/login">
            立即登入
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpFillInfo;
