import { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import CancelOrderModal from "../components/CancelOrderModal";

import { apiOrdersList } from "../api";
import { Order } from "../api/interface/orders";

import styles from "../assets/scss/modules/member.module.scss";
import Modal from "bootstrap/js/dist/modal";

let cancelOrderModal: Modal | null = null;

const MemberOrder = () => {
  const navigate = useNavigate();

  // 取得所有訂單
  const [orderList, setOrderList] = useState<Order[]>([]);

  const getOrderList = async () => {
    const res = await apiOrdersList();
    if (res.data.status) {
      setOrderList(res.data.result);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  // 篩選歷史訂單
  const historyOrderList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersBeforeToday = orderList.filter((order) => {
      const checkOutDate = new Date(order.checkOutDate);
      checkOutDate.setHours(0, 0, 0, 0);
      return checkOutDate < today && order.status === 0;
    });

    return ordersBeforeToday;
  }, [orderList]);

  // 篩選即將來的行程
  const upcomingOrderList = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const ordersBeforeToday = orderList.filter((order) => {
      const checkInDate = new Date(order.checkInDate);
      checkInDate.setHours(0, 0, 0, 0);
      return checkInDate > today && order.status === 0;
    });

    return ordersBeforeToday;
  }, [orderList]);

  // 計算住宿天數
  const calculateNight = (
    checkInDate: string,
    checkOutDate: string,
  ): number => {
    const startDate: Date = new Date(checkInDate);
    const endDate: Date = new Date(checkOutDate);
    const timeDifference: number = endDate.getTime() - startDate.getTime();

    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  // 日期格式化
  const dateTimeFormate = (datetime: string) => {
    return new Date(datetime).toLocaleDateString(undefined, {
      month: "long",
      day: "numeric",
      weekday: "long",
      year: "numeric",
    });
  };

  // 前往房型介紹頁
  const goToRoomDetail = () => {
    navigate("/room_detail");
  };

  // 取消預定
  const modalRef = useRef<HTMLDivElement>(null);
  const [cancelID, setCancelID] = useState("");

  useEffect(() => {
    if (!modalRef.current) return;
    cancelOrderModal = new Modal(modalRef.current);
  }, []);

  const showCancelOrderModal = (id: string) => {
    if (!cancelOrderModal) return;
    setCancelID(id);
    cancelOrderModal.show();
  };

  const hideCancelOrder = () => {
    if (!cancelOrderModal) return;
    cancelOrderModal.hide();
  };

  return (
    <>
      <CancelOrderModal
        modalRef={modalRef}
        cancelID={cancelID}
        hideModal={() => hideCancelOrder()}
        reloadOrderList={() => getOrderList()}
      />
      <div className="row">
        {/* 即將來的行程 */}
        <div className="col-12 col-md-7">
          {upcomingOrderList.length ? (
            // 訂單列表
            upcomingOrderList.map((order) => (
              <div
                key={order._id}
                className="bg-white p-3 p-sm-6 p-md-7 mb-5"
                style={{ borderRadius: "20px" }}
              >
                <p className="mb-2 fs-7 text-gray-dark">
                  預訂參考編號： {order._id}
                </p>
                <h5 className="text-black fw-bold mb-0">即將來的行程</h5>
                <picture
                  className={`d-flex align-items-center my-5 my-sm-7 overflow-hidden ${styles.order_picture}`}
                  style={{ borderRadius: "8px" }}
                >
                  <img
                    src={order.roomId.imageUrl}
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                    alt={order.roomId.name}
                  />
                </picture>
                <h6
                  className={`text-gray-dark fw-bold mb-5 ${styles.order_subtitle}`}
                >
                  <span
                    className="pe-3"
                    style={{ borderRight: "solid 1px #909090" }}
                  >
                    {order.roomId.name}，
                    {calculateNight(order.checkInDate, order.checkOutDate)} 晚
                  </span>
                  <span className="ps-3">住宿人數：{order.peopleNum} 位</span>
                </h6>
                <div className="mb-5">
                  <p
                    className={`text-gray-dark fs-7 mb-2 ${styles.deco_title}`}
                  >
                    入住：{dateTimeFormate(order.checkInDate)}，15:00 可入住
                  </p>
                  <p
                    className={`text-gray-dark fs-7 ${styles.deco_title_green}`}
                  >
                    退房：{dateTimeFormate(order.checkOutDate)}，12:00 前退房
                  </p>
                </div>
                <p className="text-gray-dark fs-7 fw-bold mb-0">
                  NT$ NT$
                  {(
                    order.roomId.price *
                      calculateNight(order.checkInDate, order.checkOutDate) -
                    1000
                  ).toLocaleString()}
                </p>
                <hr
                  className="my-5 my-sm-7"
                  style={{ borderTop: "solid 1px #ECECEC", opacity: 1 }}
                />

                {/* 房內設備 */}
                <div className="mb-5 mb-sm-7">
                  <div
                    className={`text-black fw-bold mb-5 ${styles.deco_title}`}
                  >
                    房內設備
                  </div>
                  <div className="border rounded p-5">
                    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-2 text-gray-dark fw-bold">
                      {order.roomId.facilityInfo.map(
                        (facility, index) =>
                          facility.isProvide && (
                            <div
                              key={index}
                              className="col d-flex align-items-center"
                            >
                              <img
                                src={`./Member/ic_check.svg`}
                                className="me-2"
                                alt="打勾"
                              />
                              {facility.title}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>

                {/* 備品提供 */}
                <div className="mb-5 mb-sm-7">
                  <div
                    className={`text-black fw-bold mb-5 ${styles.deco_title}`}
                  >
                    備品提供
                  </div>
                  <div className="border rounded p-5">
                    <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-2 text-gray-dark fw-bold">
                      {order.roomId.amenityInfo.map(
                        (amenity, index) =>
                          amenity.isProvide && (
                            <div
                              key={index}
                              className="col d-flex align-items-center"
                            >
                              <img
                                src={`./Member/ic_check.svg`}
                                className="me-2"
                                alt="打勾"
                              />
                              {amenity.title}
                            </div>
                          ),
                      )}
                    </div>
                  </div>
                </div>

                <div className="row gx-3">
                  <div className="col-6">
                    <Button
                      text="取消預定"
                      btnType="secondary"
                      fit="container"
                      onClick={() => showCancelOrderModal(order._id)}
                    />
                  </div>
                  <div className="col-6">
                    <Button
                      text="查看詳情"
                      btnType="primary"
                      fit="container"
                      onClick={() => goToRoomDetail()}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            // 空值
            <div
              className="bg-white p-3 p-sm-6 p-md-7 mb-5"
              style={{ borderRadius: "20px" }}
            >
              <h5 className="text-black fw-bold mb-7">即將來的行程</h5>
              <div className="text-center">
                <p className="fs-7 text-gray-dark mb-3 mb-sm-5">
                  暫無即將來臨的行程
                </p>

                <Button
                  text="立即訂房"
                  btnType="primary"
                  onClick={() => navigate("/room")}
                />
              </div>
            </div>
          )}
        </div>

        {/* 歷史訂單 */}
        <div className="col-12 col-md-5">
          <div
            className="bg-white p-3 p-sm-6 p-md-7"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-5 mb-sm-7">歷史訂單</h5>

            {historyOrderList.length ? (
              <>
                {
                  // 訂單列表
                  historyOrderList.map((order, index) => (
                    <div
                      key={order._id}
                      className={`d-flex flex-column flex-xl-row border-bottom pb-5 pb-sm-7 ${
                        index && "pt-5 pt-sm-7"
                      } ${
                        index === historyOrderList.length - 1 &&
                        "border-bottom-0"
                      }`}
                    >
                      <picture
                        className="overflow-hidden flex-shrink-0 mb-5"
                        style={{
                          width: "120px",
                          height: "80px",
                          borderRadius: "8px",
                        }}
                      >
                        <img
                          src={order.roomId.imageUrl}
                          className="w-100 h-100"
                          style={{ objectFit: "cover" }}
                          alt={order.roomId.name}
                        />
                      </picture>
                      <div className="ms-0 ms-xl-5">
                        <div className="fs-7 text-gray-dark">
                          預訂參考編號： {order._id.toLocaleUpperCase()}
                        </div>
                        <h6 className="text-gray-dark fw-bold my-3">
                          {order.roomId.name}
                        </h6>
                        <div className="mb-3">
                          <div className="text-gray-dark fs-7 mb-2">
                            住宿天數：
                            {calculateNight(
                              order.checkInDate,
                              order.checkOutDate,
                            )}{" "}
                            晚
                          </div>
                          <div className="text-gray-dark fs-7">
                            住宿人數：{order.peopleNum} 位
                          </div>
                        </div>
                        <div className="mb-3">
                          <div
                            className={`text-gray-dark fs-7 mb-2 ${styles.deco_title}`}
                          >
                            入住：{dateTimeFormate(order.checkInDate)}
                          </div>
                          <div
                            className={`text-gray-dark fs-7 ${styles.deco_title_green}`}
                          >
                            退房：{dateTimeFormate(order.checkOutDate)}
                          </div>
                        </div>
                        <div className="text-gray-dark fs-7 fw-bold">
                          NT$
                          {(
                            order.roomId.price *
                              calculateNight(
                                order.checkInDate,
                                order.checkOutDate,
                              ) -
                            1000
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                }
                <Button text="查看更多" btnType="secondary" fit="container" />
              </>
            ) : (
              // 空值
              <div className="text-center">
                <p className="fs-7 text-gray-dark mb-3 mb-sm-5">無資料</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberOrder;
