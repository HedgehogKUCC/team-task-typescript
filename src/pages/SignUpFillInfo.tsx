import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import CheckIcon from '/ic_check.svg';
import ZipCodes from '../utils/zipcodes';

const SignUpFillInfo = () => {
  const [selectCounty, setSelectCounty] = useState('');
  const [selectCity, setSelectCity] = useState('');
  const [cities, setCities] = useState<string[]>([]);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
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
    setSelectCity('');
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
    setMonth('');
    setDay('');
    setRenderDays([]);
  };

  const onChangeMonthHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
    setDay('');

    if (e.target.value === '2') {
      /* 閏年判斷
        1. 四的倍數但非 100的倍數
        2. 四百的倍數
      */
      if (Number(year) % 4 === 0 && Number(year) % 100 !== 0 || Number(year) % 400 === 0) {
        setRenderDays(totalDays(29));
      } else {
        setRenderDays(totalDays(28));
      }
    } else if (['4', '6', '9', '11'].includes(e.target.value)) {
      setRenderDays(totalDays(30));
    } else {
      setRenderDays(totalDays(31));
    }
  };

  useEffect(() => {
    setRenderDays(totalDays(31));
  }, []);

  return (
    <div className="mx-auto pt-5 pt-xxl-1 login_signUp_form_wrap">
      <div className="d-flex flex-column">
        <p className="d-block d-sm-none mb-2 text-primary">享樂酒店，誠摯歡迎</p>
        <h1 className="mb-3">立即註冊</h1>
        <div className="mb-7 py-3 d-flex justify-content-between align-items-center">
          <div>
            <div style={{ width: '32px', height: '32px' }} className="mx-auto mb-1 d-flex justify-content-center align-items-center bg-primary rounded-circle fw-bold"><img src={CheckIcon} alt="" /></div>
            <p className="mb-0">輸入信箱及密碼</p>
          </div>
          <div style={{ width: '188px', height: '2px' }} className="bg_neutral_60 d-none d-sm-block"></div>
          <div style={{ width: '55px', height: '2px' }} className="bg_neutral_60 d-block d-sm-none"></div>
          <div>
            <div style={{ width: '32px', height: '32px' }} className="mx-auto mb-1 d-flex justify-content-center align-items-center bg-primary rounded-circle fw-bold">2</div>
            <p className="mb-0">填寫基本資料</p>
          </div>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">姓名</label>
            <input type="text" className="form-control" id="name" placeholder="請輸入姓名" />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">手機號碼</label>
            <input type="number" className="form-control" id="phone" placeholder="請輸入手機號碼" />
          </div>
          <div className="mb-3">
            <label className="form-label">生日</label>
            <div className="d-flex">
              <select className="me-2 form-select" value={year} onChange={onChangeYearHandler}>
                <option value="" disabled>-- 年份 --</option>
                { Years.map((year) => <option key={year} value={year}>{year}年</option>) }
              </select>
              <select className="me-2 form-select" value={month} onChange={onChangeMonthHandler}>
                <option value="" disabled>-- 月份 --</option>
                { Months.map((month) => <option key={month} value={month}>{month}月</option>) }
              </select>
              <select className="form-select" value={day} onChange={(e) => setDay(e.target.value)}>
                <option value="" disabled>-- 日期 --</option>
                { renderDays.map((day) => <option key={day} value={day}>{day}日</option>) }
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">地址</label>
            <div className="mb-3 d-flex">
              <select className="me-2 form-select" value={selectCounty} onChange={onChangeCountyHandler}>
                <option value="" disabled>-- 請選擇縣市 --</option>
                { Counties.map((county) => <option key={county} value={county}>{county}</option>) }
              </select>
              <select className="form-select" value={selectCity} onChange={e => setSelectCity(e.target.value)}>
                <option value="" disabled>-- 請選擇地區 --</option>
                { cities.map((city) => <option key={city} value={city}>{city}</option>) }
              </select>
            </div>
            <input type="text" className="form-control" placeholder="請輸入詳細地址" />
          </div>
          <div className="mb-7">
            <div className="form-check mb-0">
              <input className="form-check-input" type="checkbox" id="rememberAccount" />
              <label className="form-check-label" htmlFor="rememberAccount">
                我已閱讀並同意本網站個資使用規範
              </label>
            </div>
          </div>
          <div className="mb-3">
            <button type="button" className="py-3 btn btn-primary btn-lg w-100 fw-bold text-white">完成註冊</button>
          </div>
        </form>
        <div className="d-flex align-items-center">
          <p className="mb-0">已經有會員了嗎？</p>
          <Link className="ms-2" to="/login">立即登入</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpFillInfo;
