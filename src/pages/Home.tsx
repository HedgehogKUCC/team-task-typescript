import { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
                <figure className="ratio ratio-16x9 overflow-hidden mb-0">
                  <img src={item.img} className="d-block w-100" alt={`Slide ${index + 1}`} />
                </figure>
              </div>);
            })
          }
        </div>
        <div style={{ zIndex: 1, backgroundColor: 'rgb(0 0 0 / 60%)' }} className="position-absolute top-0 start-0 w-100 h-100">
          <div className="container h-100 d-flex  justify-content-between align-items-center">
            <h1 style={{ width: '35%' }} className="text-primary fw-bold border-bottom border-2 border-primary pb-7 mb-0">享樂酒店
              <span className="d-block h4 mb-0 mt-2">Enjoyment Luxury Hotel</span>
            </h1>
            <div style={{ width: '55%', background: 'linear-gradient(rgb(255 255 255 / 0%), rgb(255 255 255 / 30%))', borderRadius: '80px' }} className="border-top border-end">
              <div className="px-9 py-8 ms-n10">
                <h2 style={{ fontSize: '100px' }} className='fw-bold'>高雄<br />豪華住宿之選</h2>
                <p className="fs-3 fw-semibold mt-5 mb-8 text_neutral_40">我們致力於為您提供無與倫比的奢華體驗與優質服務</p>
                <button type="button" className="py-3 btn btn-light btn-lg w-100 fw-bold">立即訂房</button>
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
