import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Room = () => {
  return (
    <>
      <Navbar />
      <div className="position-relative">
        <figure>
          <img src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/banner.png" className="img-fluid" alt="" />
        </figure>
        <div className="position-absolute top-0 left-0 w-100 h-100 bg-dark" style={{ '--bs-bg-opacity': '0.6' } as React.CSSProperties}></div>
        <div className="mb-0 position-absolute top-50 start-50  translate-middle rounded-1 w-50 d-flex justify-content-between align-items-center">
          <div className="text-primary border-bottom pb-7 w-65 border-primary-white">
            <h2>享樂酒店</h2>
            <h5 className="mb-0">Enjoyment Luxury Hotel</h5>
          </div>
          <div className="">
            <h1 className="mb-0">客房旅宿</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Room;
