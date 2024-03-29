import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetRoom } from "../api/apiRoom";
import type { Room } from "../api/interface/room";
import Button from "../components/Button";
import SizeIcon from "/ic_Size.svg";
import PersonIcon from "/ic_Person.svg";
import CarIcon from "/ic_Car.svg";
import CheckIcon from "/ic_check_primary.svg";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { zhTW } from "date-fns/locale";

import { useAppDispatch } from "../store/hook";
import { setRoomId, setStartDate, setEndDate, setPeople } from "../store/slices/reserveSlice";

const RoomDetail = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [roomData, setRoomData] = useState<Room>();

  //取得房間資料
  const getRoomData = async () => {

    if (!roomId) {
      navigate("/", { replace: true });
      return;
    } 

    const res = await apiGetRoom(roomId);
    if (res) {
      setRoomData(res.result);
    }
  };

  useEffect(() => {
    getRoomData();
  }, [roomId]);

  const BookingInstructions: string[] = [
    "入住時間為下午3點，退房時間為上午12點。",
    "如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。",
    "請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。",
    "若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。",
    "請愛惜我們的房間與公共空間，並保持整潔。",
    "如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。",
    "我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。",
    "請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。",
    "我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。",
    "為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定."
  ];

  const [defaultDate, setDefaultDate] = useState('');
  const [defaultCheckoutDate, setDefaultCheckoutDate] = useState('');

  // 輪播資料
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    document.documentElement.scrollTop = 0;

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 獲取當前年月日
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // 格式化日期字符串
    const formattedDate = `${year}/${month}/${day}`;
    const formattedTomorrow = `${tomorrow.getFullYear()}/${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}/${tomorrow.getDate().toString().padStart(2, '0')}`;

    // 設置為 input 的預設值
    setDefaultDate(formattedDate);
    setDefaultCheckoutDate(formattedTomorrow);
  }, []);

  const [isSelectDateOpen, setIsSelectDateOpen] = useState(false); //日期選擇器是否開啟
  const dateRangeRef = useRef<HTMLDivElement | null>(null);
  //日期選擇器
  const [selectDate, setSelectDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]);
  const [roomNights, setRoomNights] = useState<number>(1); //訂房天數
  const [totalPrice, setTotalPrice] = useState<number>(0); //總價格

  useEffect(() => {
    setRoomNights(
      calculateNights(selectDate[0].startDate, selectDate[0].endDate) !== 0
        ? calculateNights(selectDate[0].startDate, selectDate[0].endDate)
        : 1,
    );
  }, [selectDate]);

  //計算總價格
  useEffect(() => {
    if (roomData) {
      const price = roomData.price * roomNights;
      setTotalPrice(price);
    }
  }, [roomNights, roomData]);

  //計算訂房天數
  const calculateNights = (startDate: Date, endDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // 每天的毫秒數
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.floor(diffTime / oneDay);
    return diffDays;
  };

  //用於顯示訂房日期
  const showFormattedDate = (date: Date) => {
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });
  };

  const handleInputClick = () => {
    if (isSelectDateOpen) {
      setIsSelectDateOpen(false);
      setDefaultDate(showFormattedDate(selectDate[0].startDate));
      setDefaultCheckoutDate(showFormattedDate(selectDate[0].endDate));
    } else {
      setIsSelectDateOpen(true);
    }
  };

  const [count, setCount] = useState(2);

  const handleIncrement = () => {
    if (!roomData) {
      alert("房間資料有誤，請洽客服");
      return;
    }

    const MAX_PEOPLE = roomData.maxPeople;
    setCount(count + 1 > MAX_PEOPLE ? MAX_PEOPLE : count + 1);
  };

  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  const checkReserveInfo = () => {
    if (!roomId) {
      navigate("/", { replace: true });
      return;
    }

    dispatch(setRoomId(roomId));
    dispatch(setStartDate(showFormattedDate(selectDate[0].startDate)));
    dispatch(setEndDate(showFormattedDate(selectDate[0].endDate)));
    dispatch(setPeople(count));

    setTimeout(() => {
      navigate(`/reserve`, { replace: true });
    }, 1000);
  };

  const goToRooms = () => {
    navigate("/room");
  };

  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section className="bg_primary_10">
        {/* 768px 以下改為輪播 */}
        <div
          id="carouselExampleIndicators"
          className="d-md-none carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div style={{ right: "unset", marginLeft: "8%" }} className="carousel-indicators">
            {roomData && roomData?.imageUrlList.map((_imageUrl, i) => (
              <button
                key={i + 1}
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to={i}
                className={i === activeIndex ? "active" : ""}
                aria-current={i === activeIndex ? "true" : "false"}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                style={{ width: `${i === activeIndex ? "60px" : "30px"}` }}
              ></button>
            ))}
          </div>
          <div className="carousel-inner">
            {roomData && roomData?.imageUrlList.map((imageUrl, i) => {
              return (
                <div
                  key={i + 1}
                  className={`carousel-item ${
                    i === activeIndex ? "active" : ""
                  }`}
                >
                  <figure className="ratio ratio-16x9 overflow-hidden mb-0 h-100">
                    <img
                      src={imageUrl}
                      className="d-block"
                      alt={`Slide ${i + 1}`}
                    />
                  </figure>
                </div>
              );
            })}
            <button
              type="button"
              style={{ position: "absolute", bottom: "20px", right: "12px", zIndex: "1" }}
              className="btn btn-outline-primary px-6 cus_secondary_button"
              onClick={goToRooms}
            >
              看更多
            </button>
          </div>
        </div>
        <div className="container">

          <div className="d-none d-md-flex row px-2 py-8">
            <>
              <div className="col-7 p-0 pe-2">
                <img
                  src={roomData?.imageUrlList[0]}
                  alt={`Image 1 description`}
                  className="w-100 rounded-start"
                />
              </div>
              <div className="col-5 p-0 position-relative">
                <img
                  src={roomData?.imageUrlList[1]}
                  alt={`Image 1 description`}
                  className="w-50 h-50 pe-2 pb-2"
                />
                <img
                  src={roomData?.imageUrlList[2]}
                  alt={`Image 1 description`}
                  className="w-50 h-50 pb-2 rounded-right-top"
                />
                <img
                  src={roomData?.imageUrlList[3]}
                  alt={`Image 1 description`}
                  className="w-50 h-50 pe-2"
                />
                <img
                  src={roomData?.imageUrlList[4]}
                  alt={`Image 1 description`}
                  className="w-50 h-50 rounded-right-bottom"
                />
                <div className="m-7 position-absolute bottom-0 end-0">
                  <Button
                    text="看更多"
                    btnType="secondary"
                    onClick={goToRooms}
                  />
                </div>
              </div>
            </>
          </div>
          <div className="row py-7 py-md-9 text-black">
            <div className="col-12 col-md-7">
              <div className="mb-5 mb-md-8">
                <h1>{roomData?.name}</h1>
                <p>{roomData?.description}</p>
              </div>
              <div className="mb-5 mb-md-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>房型基本資訊</h5>
                </div>
                <div className="d-flex text-dark">
                  <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97">
                    <img src={SizeIcon} alt="Size Icon" />
                    <p className="mt-2 mb-0">{roomData?.areaInfo}</p>
                  </div>
                  <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97 mx-3">
                    <img src={CarIcon} alt="Car Icon" />
                    <p className="mt-2 mb-0">{roomData?.bedInfo}</p>
                  </div>
                  <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97">
                    <img src={PersonIcon} alt="Person Icon" />
                    <p className="mt-2 mb-0">2-4 人</p>
                  </div>
                </div>
              </div>
              <div className="mb-5 mb-md-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>房間格局</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex flex-wrap">
                  {roomData?.roomlayoutInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <div className="flex-shrink-0">
                        <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                      </div>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-5 mb-md-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>房內設備</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex flex-wrap">
                  {roomData?.facilityInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <div className="flex-shrink-0">
                        <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                      </div>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-5 mb-md-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>備品提供</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex flex-wrap">
                  {roomData?.amenityInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <div className="flex-shrink-0">
                        <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                      </div>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-5 mb-md-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>訂房須知</h5>
                </div>
                <div>
                  {BookingInstructions.map((item, index) => (
                    <div key={index}>
                      <p className="mb-2">{index + 1}. {item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-5">
              <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex">
                <div className="py-3">
                  <p className="fs-24 pb-7">預訂房型</p>
                  <h2 className="fw-bold">{roomData?.name}</h2>
                  <p className="pb-6">{roomData?.description}</p>
                  <div className="position-relative d-flex mb-7">
                    <input className="w-50 form-control me-2" type="text" placeholder="入住" defaultValue={defaultDate} onClick={handleInputClick} />
                    <input className="w-50 form-control" type="text" placeholder="退房" defaultValue={defaultCheckoutDate} onClick={handleInputClick} />
                    {isSelectDateOpen && (
                      <div
                        ref={dateRangeRef}
                        style={{ position: "absolute", top: "60px", left: "0px" }}
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

                  <div className="row">
                    <span className="d-flex align-items-center col-2">人數</span>
                    <div className="d-flex align-items-center justify-content-end col-10">
                      <button className="p-0" style={{ border: 'none', background: 'none' }} onClick={handleDecrement}>
                        <div style={{ lineHeight: '75px' }} className="text-center square_75 border border-2 rounded-circle">➖</div>
                      </button>
                      <span className="px-3 fs-20">{count}</span>
                      <button className="p-0" style={{ border: 'none', background: 'none' }} onClick={handleIncrement}>
                        <div style={{ lineHeight: '75px' }} className="text-center square_75 border border-2 rounded-circle">➕</div>
                      </button>
                    </div>
                  </div>
                  <p className="m-0 fs-24 py-7 text-primary">NT$ {totalPrice.toLocaleString("en-US")}</p>
                  <Button
                    text="立即預訂"
                    btnType="primary"
                    fit="container"
                    onClick={checkReserveInfo}
                  />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default RoomDetail;
