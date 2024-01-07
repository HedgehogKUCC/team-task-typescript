import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroButton from "../components/HeroButton";
import SectionTitle from "../components/SectionTitle";
import styles from "../assets/scss/modules/home.module.scss";
import { apiHomeNews } from "../api";

const Home = () => {
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

  return (
    <>
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
                <HeroButton text="立即訂房" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 最新消息 */}
      <section className="bg_primary_10 py-8 py-md-9">
        <div className="container">
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
      </section>

      {/* 關於我們 */}
      <section className="bg-dark position-relative py-9" style={{ zIndex: 1 }}>
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
      <Footer />
    </>
  );
};

export default Home;
