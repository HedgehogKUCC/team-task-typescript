import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGetRoom } from "../api/apiRoom";
import type { Room } from "../api/interface/room";
import Button from "../components/Button";
import SizeIcon from "/ic_Size.svg";
import PersonIcon from "/ic_Person.svg";
import CarIcon from "/ic_Car.svg";
import CheckIcon from "/ic_check_primary.svg";
// import { format } from 'date-fns';
// import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';


const RoomDetail = () => {
  const { roomId } = useParams();

  const [roomData, setRoomData] = useState<Room>();

  //取得房間資料
  const getRoomData = async () => {
    const res = await apiGetRoom(roomId);
    if (res) {
      setRoomData(res.result);
    }
  };

  useEffect(() => {
    getRoomData();
  }, [roomId]);

  console.log('roomData', roomData);

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

  // const [selected, setSelected] = useState<Date>();

  // let footer = <p>Please pick a day.</p>;
  // if (selected) {
  //   footer = <p>You picked {format(selected, 'PP')}.</p>;
  // }

  const [defaultDate, setDefaultDate] = useState('');
  const [defaultCheckoutDate, setDefaultCheckoutDate] = useState('');

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // 獲取當前年月日
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');

    // 格式化日期字符串
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTomorrow = `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1).toString().padStart(2, '0')}-${tomorrow.getDate().toString().padStart(2, '0')}`;

    // 設置為 input 的預設值
    setDefaultDate(formattedDate);
    setDefaultCheckoutDate(formattedTomorrow);
  }, []);


  const [count, setCount] = useState(2);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count > 1 ? count - 1 : 1);
  };

  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section className="bg_primary_10">
        <div className="container">

          <div className="row px-2 py-8">
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
                    btnType="third"
                  />
                </div>
              </div>
            </>
          </div>
          <div className="row py-9 text-black">
            <div className="col-7">
              <div className="mb-8">
                <h1>{roomData?.name}</h1>
                <p>{roomData?.description}</p>
              </div>
              <div className="mb-8">
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
              <div className="mb-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>房間格局</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex">
                  {roomData?.roomlayoutInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>房內設備</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex">
                  {roomData?.facilityInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-8">
                <div className="d-flex mb-3">
                  <div className="bg-primary rounded me-15" style={{ width: "4px", height: "30px" }}></div>
                  <h5>備品提供</h5>
                </div>
                <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex">
                  {roomData?.amenityInfo.map((item, index) => item.isProvide ? (
                    <div className="d-flex py-3 me-7" key={index}>
                      <img src={CheckIcon} alt="Size Icon" /><span className="mb-0">{item.title}</span>
                    </div>
                  ) : null)}
                </div>
              </div>
              <div className="mb-8">
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
            <div className="col-5">
              <div className="bg-white px-3 py-3 border rounded-3 border-primary border-opacity-25 d-flex">
                <div className="py-3">
                  <p className="fs-24 pb-7">預訂房型</p>
                  <h2 className="fw-bold">尊爵雙人房</h2>
                  <p className="pb-6">享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。</p>

                  {/* <div>
                    <DayPicker
                      mode="single"
                      selected={selected}
                      onSelect={setSelected}
                      footer={footer}
                      numberOfMonths={2}
                    />
                  </div> */}

                  <div className="d-flex mb-7">
                    <input className="w-50 form-control me-2" type="text" placeholder="入住" defaultValue={defaultDate} />
                    <input className="w-50 form-control" type="text" placeholder="退房" defaultValue={defaultCheckoutDate} />
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
                  <p className="m-0 fs-24 py-7 text-primary">NT$ 10,000</p>
                  <Button
                    text="立即預訂"
                    btnType="primary-w-100"
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
