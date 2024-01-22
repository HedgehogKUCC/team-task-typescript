import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CheckGreenIcon from "/ic_checkGreen.svg";
import CheckIcon from "/ic_check_primary.svg";
import LineIcon from "/ic_line.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/hook";
import { selectUser, setName, setToken } from "../store/slices/userSlice";
import { selectOrder } from "../store/slices/orderSlice";
const ReserveRoomSuccess = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const order = useAppSelector(selectOrder).result;
  const orderUserInfo = order.userInfo;
  const orderRoomInfo = order.roomId;
  const localStorageName =
    localStorage.getItem("enjoyment_luxury_hotel_name") || "";
  const localStorageToken =
    localStorage.getItem("enjoyment_luxury_hotel_token") || "";
  const UserName = user.name || localStorageName;
  const UserToken = user.token || localStorageToken;
  if (!user.name && localStorageName) {
    dispatch(setName(UserName));
  }

  if (!user.token && localStorageToken) {
    dispatch(setToken(UserToken));
  }

  const navigate = useNavigate();
  useEffect(() => {
    if (!order && user) {
      //如果沒有order資料
      //前往/reserve頁面
      navigate("/reserve");
    }
  }, [order, navigate, user]);

  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section className=" py-9">
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="d-flex align-items-center mb-7">
                <img
                  className="w-7 h-7 me-7"
                  src={CheckGreenIcon}
                  alt="CheckGreenIcon"
                />
                <div>
                  <h2 className="fs-md-1 fs-3">恭喜，{UserName}！</h2>
                  <h2 className="fs-md-1 fs-3">您已預訂成功</h2>
                </div>
              </div>
              <p>
                我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。
              </p>

              <div
                style={{ margin: "80px 0", border: "1px solid #ECECEC" }}
              ></div>

              <div>
                <h3 className="fs-4 mb-7">立即查看您的訂單紀錄</h3>
                <button
                  className="btn btn-primary text-white"
                  style={{ padding: "16px 60px" }}
                >
                  前往我的訂單
                </button>
              </div>

              <div
                style={{ margin: "80px 0", border: "1px solid #ECECEC" }}
              ></div>

              <h3 className="fs-4 mb-7">訂房人資訊</h3>
              <div className="mb-5">
                <p>姓名</p>
                <p>{orderUserInfo.name}</p>
              </div>
              <div className="mb-5">
                <p>手機號碼</p>
                <p>{orderUserInfo.phone}</p>
              </div>
              <div className="mb-5">
                <p>電子信箱</p>
                <p>{orderUserInfo.email}</p>
              </div>
            </div>
            <div className="col text-black">
              <div className="rounded-20 p-7 bg-white">
                <div className="mb-7">
                  <p>預訂參考編號： HH2302183151222</p>
                  <p className="fs-4 fw-bold">即將來的行程</p>
                </div>
                <img
                  className="object-fit-cover mb-7 rounded-8"
                  src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room1.png"
                  alt="room"
                />
                <div className="d-flex align-items-center  mb-5 ">
                  <p className="mb-0 fw-bold">尊爵雙人房，1 晚</p>
                  <img className="mx-3" src={LineIcon} alt="Line Icon" />
                  <p className="mb-0 fw-bold">住宿人數：2 位</p>
                </div>
                <div className="mb-5">
                  <h4
                    className="fs-7 border-left-primary-4 my-4"
                    style={{ paddingLeft: "12px" }}
                  >
                    入住：6 月 10 日星期二，15:00 可入住
                  </h4>
                  <h4
                    className="fs-7 my-4"
                    style={{
                      paddingLeft: "12px",
                      borderLeft: "4px solid #909090",
                    }}
                  >
                    退房：6 月 11 日星期三，12:00 前退房
                  </h4>
                </div>
                <p className="fw-bold">NT$ 10,000</p>

                <div
                  style={{ margin: "40px 0", border: "1px solid #ECECEC" }}
                ></div>

                {/* 房內設備 */}
                <h4
                  className="fs-7 fw-bold border-left-primary-4 my-5"
                  style={{ paddingLeft: "12px" }}
                >
                  房內設備
                </h4>
                <div className=" rounded-8 bg-white d-flex flex-wrap gap-7">
                  <div className="row">
                    {orderRoomInfo.facilityInfo.map(
                      (item, index) =>
                        item.isProvide && (
                          <div className="col-4" key={index}>
                            <span className="d-flex align-items-center me-7">
                              <img
                                className="pe-2"
                                src={CheckIcon}
                                alt="Check Icon"
                              />
                              <p className="mb-0 text-nowrap fs-7">
                                {item.title}
                              </p>
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
                {/* 備品提供 */}
                <h4
                  className="fs-7 fw-bold border-left-primary-4 my-5"
                  style={{ paddingLeft: "12px" }}
                >
                  備品提供
                </h4>
                <div className=" rounded-8 bg-white d-flex flex-wrap gap-7">
                  <div className="row">
                    {orderRoomInfo.amenityInfo.map(
                      (item, index) =>
                        item.isProvide && (
                          <div className="col-4" key={index}>
                            <span className="d-flex align-items-center me-7">
                              <img
                                className="pe-2"
                                src={CheckIcon}
                                alt="Check Icon"
                              />
                              <p className="mb-0 text-nowrap fs-7">
                                {item.title}
                              </p>
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReserveRoomSuccess;
