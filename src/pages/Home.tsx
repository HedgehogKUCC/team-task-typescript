import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroButton from "../components/HeroButton";
import '../assets/scss/components/_home.scss';

const Home = () => {
  // 輪播資料
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselList = [
    { id: 1, img: 'https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png?raw=true' },
    { id: 2, img: 'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, img: 'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, img: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, img: 'https://images.unsplash.com/photo-1582582484783-0a7a9e45b0d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3https://images.unsplash.com/photo-1582582484783-0a7a9e45b0d6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <>
      <Navbar />

      {/* 輪播區塊 */}
      <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {carouselList.map((item, index) => (
            <button
              key={item.id}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={index === activeIndex ? 'active' : ''}
              aria-current={index === activeIndex ? 'true' : 'false'}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActiveIndex(index)}
            ></button>
          ))}
        </div>
        <div className="carousel-inner">
          {
            carouselList.map((item, index) => {
              return (<div key={item.id} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                <picture className="carousel_picture">
                  <img src={item.img} className="carousel_img" alt={`Slide ${index + 1}`} />
                </picture>
              </div>);
            })
          }
        </div>
        <div className="carousel_content_wrap">
          <div className="container carousel_container">
            <h1 className="carousel_name">享樂酒店
              <span>Enjoyment Luxury Hotel</span>
            </h1>
            <div className="carousel_content_block">
              <div className="carousel_content">
                <h2 className="carousel_title">高雄<br />豪華住宿之選</h2>
                <h3 className='carousel_subtitle'>我們致力於為您提供無與倫比的奢華體驗與優質服務</h3>
                <HeroButton text="立即訂房" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
