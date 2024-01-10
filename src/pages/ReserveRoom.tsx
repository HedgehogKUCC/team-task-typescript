import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import SizeIcon from "/ic_Size.svg";
import BedIcon from "/ic_Bed.svg";
import PersonIcon from "/ic_Person.svg";
import CheckIcon from "/ic_check_primary.svg";
  

const ReserveRoom = () => {
  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />
      <section
        className="bg_primary_10 text-black py-7 py-md-9"
      >
        <div className="container">
          <div className="d-flex align-items-center  mb-7">
            <Link to="/">
              <i className="bi bi-chevron-left text-black fw-bold me-2" style={{ fontSize:"40px"}}></i>
            </Link>
            <h2 className="fw-bold">確認訂房資訊</h2>
          </div>

          <div className="row justify-content-between">
            <div className="col-md-7">
              <h3 className="fw-bold fs-28 mb-7">訂房資訊</h3>
              {/* 選擇房型 */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className=" ">
                  <h4 className="fw-bold fs-6 border-left-primary-4" style={{ paddingLeft: "12px" }}>選擇房型</h4>
                  <p>尊爵雙人房</p>
                </div>
                <button className="fw-bold btn text-decoration-underline">編輯</button>
              </div>
              {/* 訂房日期 */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h4 className="fw-bold fs-6 border-left-primary-4" style={{ paddingLeft: "12px" }}>訂房日期</h4>
                  <p className="mb-0">入住：6 月 10 日星期二</p>
                  <p>退房：6 月 11 日星期三</p>
                </div>
                <button className="fw-bold btn text-decoration-underline">編輯</button>
              </div>
              {/* 房客人數 */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="fw-bold fs-6 border-left-primary-4" style={{ paddingLeft: "12px" }}>房客人數</h4>
                  <p className="mb-0">2 人</p>
                </div>
                <button className="fw-bold btn text-decoration-underline">編輯</button>
              </div>

              <div style={{ margin: "48px 0", border: "1px solid #909090" }}></div>

              {/* 訂房人資訊 */}
              <div className="d-flex justify-content-between align-items-center mb-7">
                <h3 className="fw-bold fs-28">訂房人資訊</h3>
                <button className="btn text-decoration-underline text-primary">套用會員資料</button>
              </div>
              <div className="mb-4">
                <label htmlFor="name" className="fw-bold mb-2">姓名</label>
                <input id="name" className="form-control" type="text" placeholder="請輸入姓名" />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="fw-bold mb-2">手機號碼</label>
                <input id="phone" className="form-control" type="number" placeholder="請輸入手機號碼" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="fw-bold mb-2">電子信箱</label>
                <input id="email" className="form-control" type="email" placeholder="請輸入電子信箱" />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="fw-bold mb-2">地址</label>
                <div className="d-flex">
                  <div className="w-100 me-3">
                    <select className="form-select">
                      <option value="高雄市" key={1}>高雄市</option>
                      <option value="台中市" key={2}>台中市</option>
                    </select>
                  </div>
                  <div className="w-100">
                    <select className="form-select">
                      <option value="新興區" key={1}>新興區</option>
                      <option value="旗津區" key={2}>旗津區</option>
                    </select>
                  </div>
                </div>

                <div style={{ margin: "48px 0", border: "1px solid #909090" }}></div>

                <h3 className="fw-bold fs-28 mb-7">房間資訊</h3>
                <h4 className="fw-bold fs-6 border-left-primary-4 my-4" style={{ paddingLeft: "12px" }}>房型基本資訊</h4>
                <div className="d-flex">
                  <div className=" rounded-8 bg-white p-3 me-3 square_97">
                    <img className="mb-2" src={SizeIcon} alt="Size Icon" style={{ fontSize:"24px"}} />
                    <p className="fw-bold">24坪</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 me-3 square_97">
                    <img className="mb-2" src={BedIcon} alt="Bed Icon" style={{ fontSize:"24px"}} />
                    <p className="fw-bold">1張大床</p>
                  </div>
                  <div className=" rounded-8 bg-white p-3 square_97">
                    <img className="mb-2" src={PersonIcon} alt="Person Icon" style={{ fontSize:"24px"}} />
                    <p className="fw-bold">2-4 人</p>
                  </div>
                </div>
                <h4 className="fw-bold fs-6 border-left-primary-4 my-4" style={{ paddingLeft: "12px" }}>房間格局</h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2" >
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">市景</p>
                    </span>
                    <span className="d-flex align-items-center me-7"style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">獨立衛浴</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">客廳</p>
                    </span>
                </div>
                <h4 className="fw-bold fs-6 border-left-primary-4 my-4" style={{ paddingLeft: "12px" }}>房內設備</h4>
                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2" >
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">平面電視</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">吹風機</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">冰箱</p>
                    </span>
                </div>
                <h4 className="fw-bold fs-6 border-left-primary-4 my-4" style={{ paddingLeft: "12px" }}>備品提供</h4>

                <div className=" rounded-8 bg-white p-4 d-flex flex-wrap gap-2" >
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">衛生紙</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">拖鞋</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">沐浴用品</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">拖鞋</p>
                    </span>
                    <span className="d-flex align-items-center me-7" style={{width:"100px"}}>
                      <img className="pe-2" src={CheckIcon} alt="Check Icon" />
                      <p className="mb-0">拖鞋</p>
                    </span>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="rounded-20 p-7 bg-white">
                  <img className="object-fit-cover mb-7 rounded-8" src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room1.png" alt="room" />
                  <h4 className="fs-28 fw-bold">價格詳情</h4>
                  <div className="d-flex justify-content-between">
                    <p>NT$ 10,000 X 2 晚</p>
                    <p>NT$ 20,000</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>住宿折扣</p>
                    <p className="text-primary">-NT$ 1,000</p>
                  </div>

                  <div style={{ margin: "24px 0", border: "1px solid #909090" }}></div>

                  <div className="d-flex justify-content-between">
                    <p className="fw-bold">總價</p>
                    <p className="fw-bold">NT$ 19,000</p>
                  </div>
                  <button className="mt-7 btn btn-primary text-white w-100">
                        確認房價
                  </button>

              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ReserveRoom;
