import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import SizeIcon from "/ic_Size.svg";
import PersonIcon from "/ic_Person.svg";
import CarIcon from "/ic_Car.svg";
import ArrowRightIcon from "/ic_ArrowRight.svg";
import { apiRoomsList } from "../api";
import { useNavigate } from 'react-router-dom';

const Room = () => {
  // 輪播資料
  const [carouselActiveIndex, setCarouselActiveIndex] = useState(0);

  const carouselList = [
    {
      id: 1,
      img: "https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1556784344-ad913c73cfc4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1582582484783-0a7a9e45b0d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3https://images.unsplash.com/photo-1582582484783-0a7a9e45b0d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  // 房型輪播資料
  interface IRoomList {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    imageUrlList: string[];
    areaInfo: string;
    bedInfo: string;
    maxPeople: number;
    price: number;
    status: number;
    facilityInfo: IFacilityInfo[];
    amenityInfo: IAmenityInfo[];
    createdAt: string;
    updatedAt: string;
  }

  interface IFacilityInfo {
    title: string;
    isProvide: boolean;
  }

  interface IAmenityInfo {
    title: string;
    isProvide: boolean;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const [roomList, setRoomList] = useState<IRoomList[]>([]);
  const [activeIndices, setActiveIndices] = useState<number[]>([]);

  const getRoomList = async () => {
    const res = await apiRoomsList();
    setRoomList(res.data.result);
    setActiveIndices(Array(res.data.result.length).fill(0));
    setActiveIndex(0);
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const handleCarouselChange = (roomIndex: number, newIndex: number) => {
    setActiveIndices((prevActiveIndices) => {
      const newActiveIndices = [...prevActiveIndices];
      newActiveIndices[roomIndex] = newIndex;
      return newActiveIndices;
    });
  };

  const navigate = useNavigate();

  const handleClick = (roomId: string) => {
    navigate(`/room_detail/${roomId}`);
  };

  return (
    <>
      <Navbar />
      <div className="bg_primary_10">
        <div className="z-2 position-relative">
          {/* banner 輪播區塊 */}
          <div
            id="carouselExampleIndicators"
            className="m-0 carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators mx-0 z-3">
              {carouselList.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === carouselActiveIndex ? "active" : ""}
                  aria-current={
                    index === carouselActiveIndex ? "true" : "false"
                  }
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => setCarouselActiveIndex(index)}
                ></button>
              ))}
            </div>
            <div className="carousel-inner rounded-start h-100">
              {carouselList.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className={`carousel-item ${index === carouselActiveIndex ? "active" : ""
                      } h-100`}
                  >
                    <figure className="ratio ratio-16x9 overflow-hidden mb-0 h-100 img-fluid">
                      <img
                        src={item.img}
                        className="d-block"
                        alt={`Slide ${index + 1}`}
                      />
                    </figure>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 遮色片 */}
          <div className="z-2 position-absolute top-0 left-0 w-100 h-100 bg-dark bg_opacity_60"></div>

          <div className="container z-3 position-absolute top-50 start-50 translate-middle">
            <div className="row flex-column flex-md-row justify-content-center align-items-center">
              <div className="col-6 col-lg-5 ps-md-0 text-primary border-md-bottom pb-md-7 border_primary_white z-index">
                <h2 className="d-none d-md-block">享樂酒店</h2>
                <h2 className="d-none d-sm-block d-md-none text-center fs-28">享樂酒店</h2>
                <h5 className="d-none d-md-block mb-0">Enjoyment Luxury Hotel</h5>
                <p className="d-none d-sm-block d-md-none mb-0 text-center">Enjoyment Luxury Hotel</p>
                <div style={{ margin: "20px auto 40px", width: "2px", height: "83px", background: "linear-gradient(#bf9d7d, #fff)" }} className="d-none d-sm-block d-md-none"></div>
              </div>
              <div className="col-4 col-lg-3 d-md-flex align-items-center justify-content-end">
                <h2 className="d-none d-md-block mb-0 fs-48">客房旅宿</h2>
                <h2 className="d-block d-md-none mb-0 text-center fs-20 fs-sm-32">客房旅宿</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="container pt-md-12 pb-7 pb-md-14 px-6 px-sm-0">
          <div className="row my-7 my-md-11">
            <div className="col-12 col-lg-6">
              <p className="h6 text-gray-dark mb-2 mb-md-3">房型選擇</p>
              <p className="h1 text-primary">各種房型，任您挑選</p>
            </div>
          </div>
          <div className="row">
            {roomList.map((item, roomIndex) => (
              <div
                className={`bg-white rounded d-flex flex-column flex-md-row px-0 ${roomList.length === roomIndex + 1 ? "my-md-5 mb-0" : "mb-5 my-md-5" }`}
                key={roomIndex}
              >
                {/* 輪播區塊 */}
                <div
                  id={`carouselExampleIndicators-${roomIndex}`}
                  className="col-12 col-md-7 carousel slide carousel-fade"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-indicators mx-0">
                    {item.imageUrlList.map((_imageUrl, i) => (
                      <button
                        key={i + 1}
                        type="button"
                        data-bs-target={`#carouselExampleIndicators-${roomIndex}`}
                        data-bs-slide-to={i}
                        className={
                          i === activeIndices[roomIndex] ? "active" : ""
                        }
                        aria-current={
                          i === activeIndices[roomIndex] ? "true" : "false"
                        }
                        aria-label={`Slide ${i + 1}`}
                        onClick={() => handleCarouselChange(roomIndex, i)}
                      ></button>
                    ))}
                  </div>
                  <div className="carousel-inner carousel_inner_rounded h-100">
                    {item.imageUrlList.map((imageUrl, i) => {
                      return (
                        <div
                          key={i + 1}
                          className={`carousel-item ${i === activeIndex ? "active" : ""
                            } h-100`}
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
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${roomIndex}`}
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#carouselExampleIndicators-${roomIndex}`}
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>

                {/* 內容區塊  */}
                <div className="col-12 col-md-5 px-2 px-md-7 py-7">
                  <p className="h2 text-dark">{item.name}</p>
                  <p className="text-gray-dark mb-0">{item.description}</p>
                  <div className="d-flex text-dark my-7  border-bottom pb-7 border_primary_white">
                    <div className="px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97">
                      <img src={SizeIcon} alt="Size Icon" />
                      <p className="mt-2 mb-0">{item.areaInfo}</p>
                    </div>
                    <div className="px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97 mx-3">
                      <img src={CarIcon} alt="Car Icon" />
                      <p className="mt-2 mb-0">{item.bedInfo}</p>
                    </div>
                    <div className="px-3 py-3 border rounded-3 border-primary border-opacity-25 square_97">
                      <img src={PersonIcon} alt="Person Icon" />
                      <p className="mt-2 mb-0">2-4 人</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between py-3">
                    <p className="h5 text-primary mb-0">NT$ {item.price}</p>
                    <img style={{ cursor: "pointer" }} src={ArrowRightIcon} alt="ArrowRight Icon" onClick={() => handleClick(item._id)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Room;
