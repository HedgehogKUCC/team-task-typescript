import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroButton from "../components/HeroButton";
import SectionTitle from "../components/SectionTitle";

import styles from "../assets/scss/modules/home.module.scss";

import { apiHomeNews, apiHomeCulinary, apiRoomsList } from "../api";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

const Home = () => {
  const navigate = useNavigate();

  // 輪播資料
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselList = [
    {
      id: 1,
      img: "https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png?raw=true",
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

  // 最新消息資料
  interface INewsList {
    _id: string;
    title: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  const [newsList, setNewsList] = useState<INewsList[]>([]);

  const getNewsList = async () => {
    const res = await apiHomeNews();
    setNewsList(res.data.result);
  };

  useEffect(() => {
    getNewsList();
  }, []);

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

  const [roomList, setRoomList] = useState<IRoomList[]>([]);

  const getRoomList = async () => {
    const res = await apiRoomsList();
    setRoomList(res.data.result);
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const [activeRoomImgIndex, setActiveRoomImgIndex] = useState(0);

  const [activeRoomIndex, setActiveRoomIndex] = useState(0);

  const [activeRoomData, setActiveRoomData] = useState(roomList[0]);

  useEffect(() => {
    setActiveRoomData(roomList[activeRoomIndex]);
  }, [activeRoomIndex, roomList]);

  // 佳餚美饌資料
  interface ICulinaryList {
    _id: string;
    title: string;
    description: string;
    diningTime: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }

  const [culinaryList, setCulinaryList] = useState<ICulinaryList[]>([]);

  const getHomeCulinary = async () => {
    const res = await apiHomeCulinary();
    setCulinaryList(res.data.result);
  };

  useEffect(() => {
    getHomeCulinary();
  }, []);

  // 交通方式資料
  interface ITrafficList {
    title: string;
    description: string;
    image: string;
  }

  const [trafficList] = useState<ITrafficList[]>([
    {
      title: "自行開車",
      description:
        "如果您選擇自行開車，可以透過國道一號下高雄交流道，往市區方向行駛，並依路標指示即可抵達「享樂酒店」。飯店內設有停車場，讓您停車方便。",
      image: "ic_car",
    },
    {
      title: "高鐵/火車",
      description:
        "如果您是搭乘高鐵或火車，可於左營站下車，外頭有計程車站，搭乘計程車約20分鐘即可抵達。或者您也可以轉乘捷運紅線至中央公園站下車，步行約10分鐘便可抵達。",
      image: "ic_train",
    },
    {
      title: "禮賓車服務",
      description:
        "承億酒店提供禮賓專車接送服務，但因目的地遠近會有不同的收費，請撥打電話將由專人為您服務洽詢專線：(07)123-4567",
      image: "ic_luxurycar",
    },
  ]);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      {/* 輪播區塊 */}
      <div
        id="carouselExampleIndicators"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {carouselList.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === activeIndex ? "active" : ""}
              aria-current={index === activeIndex ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {carouselList.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`carousel-item ${
                  index === activeIndex ? "active" : ""
                }`}
              >
                <picture className={styles.carousel_picture}>
                  <img
                    src={item.img}
                    className={styles.carousel_img}
                    alt={`Slide ${index + 1}`}
                  />
                </picture>
              </div>
            );
          })}
        </div>
        <div className={styles.carousel_content_wrap}>
          <div className={`wider_container ${styles.carousel_container}`}>
            <h1 className={styles.carousel_name}>
              享樂酒店
              <span>Enjoyment Luxury Hotel</span>
            </h1>
            <div className={styles.carousel_content_block}>
              <div className={styles.carousel_content}>
                <h2 className={styles.carousel_title}>
                  高雄
                  <br />
                  豪華住宿之選
                </h2>
                <h3 className={styles.carousel_subtitle}>
                  我們致力於為您提供無與倫比的奢華體驗與優質服務
                </h3>
                <HeroButton text="立即訂房" onClick={() => navigate("/room")} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最新消息 */}
      <section
        className="bg_primary_10 pt-8 pb-7 py-md-9 position-relative"
        style={{ zIndex: 2 }}
      >
        <div className="container position-relative">
          <img
            src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/dot.png?raw=true"
            alt="裝飾性圓點"
            className={`${styles.news_dot} ${styles.news_dot_1}`}
          />
          <div className="row">
            <div className="col-md-2 col-12">
              <SectionTitle text={`最新\n消息`} decoPosition="bottom" />
            </div>
            <div className="col-md-10 col-12">
              {newsList.map((item) => (
                <div className="row mb-7 mb-md-5" key={item._id}>
                  <div className="col-12 col-md-5 mb-5 mb-md-0">
                    <img
                      src={item.image}
                      className="img-fluid rounded"
                      alt={item.title}
                    />
                  </div>
                  <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
                    <h5 className="h3 text-black fw-bold mb-2 mb-md-5">
                      {item.title}
                    </h5>
                    <p className="text-gray-dark mb-0">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <img
          src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/dot.png?raw=true"
          alt="裝飾性圓點"
          className={`${styles.news_dot} ${styles.news_dot_2}`}
        />
      </section>

      {/* 關於我們 */}
      <section
        className="bg-dark position-relative py-8 py-md-9 overflow-hidden"
        style={{ zIndex: 1 }}
      >
        <picture>
          <source
            srcSet="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E8%A1%8C%E5%8B%95%E7%89%88/about.png?raw=true"
            media="(max-width: 576px)"
          />
          <img
            src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/about.png?raw=true"
            className={styles.about_bg}
            alt="關於我們"
          />
        </picture>
        <div className="container">
          <div className="row justify-content-end">
            <div className="col-12 col-md-3"></div>
            <div className="col-11 col-md-9">
              <div className={styles.about_block}>
                <SectionTitle text={`關於\n我們`} color="#fff" />
                <article>
                  <p className="mb-3 mb-sm-7">
                    享樂酒店，位於美麗島高雄的心臟地帶，是這座城市的璀璨瑰寶與傲人地標。
                    <br />
                    我們的存在，不僅僅是為了提供奢華的住宿體驗，更是為了將高雄的美麗與活力，獻給每一位蒞臨的旅客。
                  </p>
                  <p className="mb-3 mb-sm-7">
                    我們的酒店，擁有時尚典雅的裝潢，每一個細節都充滿著藝術與設計的精緻。
                    <br />
                    我們的員工，都以熱情的服務與專業的態度，讓每一位客人都能感受到賓至如歸的溫暖。
                  </p>
                  <p className="mb-3 mb-sm-7">
                    在這裡，您可以遙望窗外，欣賞高雄的城市景色，感受這座城市的繁華與活力；您也可以舒適地坐在我們的餐廳，品嚐精緻的佳餚，體驗無與倫比的味覺盛宴。
                  </p>
                  <p className="mb-0">
                    享樂酒店，不僅是您在高雄的住宿之選，更是您感受高雄魅力的最佳舞台。我們期待著您的蒞臨，讓我們共同編織一段難忘的高雄故事。
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 房型輪播 */}
      <section className={`bg-dark py-8 py-md-9 ${styles.room_section}`}>
        <div className="container-fluid g-6 g-md-0 overflow-hidden">
          <div className="row align-items-end">
            <div className="col-12 col-md-6 mb-5 mb-md-0">
              <div
                id="carouselExampleIndicators2"
                className="carousel slide carousel-fade"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {activeRoomData?.imageUrlList.map((item, index) => (
                    <button
                      key={item}
                      type="button"
                      data-bs-target="#carouselExampleIndicators2"
                      data-bs-slide-to={index}
                      className={index === activeRoomImgIndex ? "active" : ""}
                      aria-current={
                        index === activeRoomImgIndex ? "true" : "false"
                      }
                      aria-label={`Slide ${index + 1}`}
                      onClick={() => setActiveRoomImgIndex(index)}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {activeRoomData?.imageUrlList.map((item, index) => {
                    return (
                      <div
                        key={item}
                        className={`carousel-item ${
                          index === activeIndex ? "active" : ""
                        }`}
                      >
                        <picture className={styles.room_picture}>
                          <img src={item} alt={`Slide ${index + 1}`} />
                        </picture>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-5 px-md-6 px-lg-7 px-xl-8">
              <h2 className="fw-bold mb-4">{activeRoomData?.name}</h2>
              <p className="fs-7">{activeRoomData?.description}</p>
              <h3 className="fw-bold my-5 my-md-7">
                NT$ {activeRoomData?.price.toLocaleString()}
              </h3>
              <HeroButton
                text="查看更多"
                onClick={() => navigate(`/room_detail/${activeRoomData._id}`)}
              />
              <div className="d-flex justify-content-end mt-5 mt-md-7">
                <img
                  src="./ic_ArrowLeft.svg"
                  className={`p-3 ${styles.room_arrow}`}
                  onClick={() =>
                    setActiveRoomIndex(
                      activeRoomIndex === 0
                        ? roomList.length - 1
                        : activeRoomIndex - 1,
                    )
                  }
                  alt="前一頁"
                />
                <img
                  src="./ic_ArrowRight.svg"
                  className={`p-3 ${styles.room_arrow}`}
                  onClick={() =>
                    setActiveRoomIndex(
                      activeRoomIndex === roomList.length - 1
                        ? 0
                        : activeRoomIndex + 1,
                    )
                  }
                  alt="下一頁"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 佳餚美饌 */}
      <section
        className="bg_primary_10 py-8 py-md-9 position-relative"
        style={{ zIndex: 1 }}
      >
        <img
          src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/dot.png?raw=true"
          alt="裝飾性圓點"
          className={styles.culinary_dot}
        />
        <div className="container">
          <SectionTitle text={`佳餚\n美饌`} />
        </div>
        <div className="container">
          <Swiper
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              576: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3.2,
              },
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className={styles.culinary_swiper}
          >
            {culinaryList.map((item) => (
              <SwiperSlide key={item._id}>
                <div className={styles.culinary_card}>
                  <img
                    src={item.image}
                    className="img-fluid"
                    alt={item.title}
                  />
                  <div className={styles.culinary_content}>
                    <div className="d-flex justify-content-between align-items-center mb-5">
                      <h5 className="mb-0">{item.title}</h5>
                      <span>{item.diningTime}</span>
                    </div>
                    <p className="mb-0">{item.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <img
          src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/line.png?raw=true"
          alt="裝飾性線條"
          className={styles.culinary_line}
        />
      </section>

      {/* 交通方式 */}
      <section className="bg_dark pt-8 pt-md-9">
        <div className="container">
          <SectionTitle text={`交通\n方式`} />
          <p className="fw-bold">台灣高雄市新興區六角路123號</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.563954606116!2d120.3015996!3d22.6327527!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e048bc2dddd65%3A0xca0cdefc0976d4f7!2zODAw6auY6ZuE5biC5paw6IiI5Y2A5YWt5ZCI5LqM6LevMeiZnw!5e0!3m2!1szh-TW!2stw!4v1704699004506!5m2!1szh-TW!2stw"
            height="360"
            style={{ width: "100%", border: 0, borderRadius: "8px" }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div className="row mt-5 mt-sm-7">
            {trafficList.map((item, index) => (
              <div className="col-12 col-sm-4 mb-5 mb-sm-0" key={index}>
                <img
                  src={`./Homepage/${item.image}.svg`}
                  className={styles.traffic_img}
                  alt={item.title}
                />
                <h5 className="mt-3">{item.title}</h5>
                <p className="fs-7 mb-0">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <picture>
          <source
            srcSet="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E8%A1%8C%E5%8B%95%E7%89%88/line.png?raw=true"
            media="(max-width: 576px)"
          />
          <img
            src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/line2.png?raw=true"
            className="img-fluid mt-7 mt-sm-8"
            alt="裝飾性線條"
          />
        </picture>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
