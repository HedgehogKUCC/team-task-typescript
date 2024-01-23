import styles from "../assets/scss/modules/member.module.scss";

const MemberOrder = () => {
  return (
    <>
      <div className="row">
        {/* 即將來的行程 */}
        <div className="col-12 col-md-7">
          <div
            className="bg-white p-5 p-sm-6 p-md-7 mb-5"
            style={{ borderRadius: "20px" }}
          >
            <p className="mb-2 text-gray-dark">
              預訂參考編號： HH2302183151222
            </p>
            <h5 className="text-black fw-bold mb-0">即將來的行程</h5>
            <picture
              className="d-flex align-items-center my-7 overflow-hidden"
              style={{ height: "240px", borderRadius: "8px" }}
            >
              <img
                src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/room2-1.png?raw=true"
                className="img-fluid "
                alt="尊爵雙人房"
              />
            </picture>
            <h6 className="text-gray-dark fw-bold mb-5">
              <span
                className="pe-3"
                style={{ borderRight: "solid 1px #909090" }}
              >
                尊爵雙人房，1 晚
              </span>
              <span className="ps-3">住宿人數：2 位</span>
            </h6>
            <div className="mb-5">
              <p className={`text-gray-dark mb-2 ${styles.deco_title}`}>
                入住：6 月 10 日星期二，15:00 可入住
              </p>
              <p className={`text-gray-dark ${styles.deco_title_green}`}>
                退房：6 月 11 日星期三，12:00 前退房
              </p>
            </div>
            <p className="text-gray-dark fw-bold">NT$ 10,000</p>
            <hr
              className="my-7"
              style={{ borderTop: "solid 1px #ECECEC", opacity: 1 }}
            />

            {/* 房內設備 */}
            <div className="mb-7">
              <div className={`text-black fw-bold mb-5 ${styles.deco_title}`}>
                房內設備
              </div>
              <div className="border rounded p-5">
                <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-2 text-gray-dark fw-bold">
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    平面電視
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    吹風機
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    冰箱
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    熱水壺
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    檯燈
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    衣櫃
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    除濕機
                  </div>
                </div>
              </div>
            </div>

            {/* 備品提供 */}
            <div className="mb-7">
              <div className={`text-black fw-bold mb-5 ${styles.deco_title}`}>
                備品提供
              </div>
              <div className="border rounded p-5">
                <div className="row row-cols-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 gy-2 text-gray-dark fw-bold">
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    平面電視
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    吹風機
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    冰箱
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    熱水壺
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    檯燈
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    衣櫃
                  </div>
                  <div className="col d-flex align-items-center">
                    <img
                      src={`./Member/ic_check.svg`}
                      className="me-2"
                      alt="打勾"
                    />
                    除濕機
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 歷史訂單 */}
        <div className="col-12 col-md-5">
          <div
            className="bg-white p-5 p-sm-6 p-md-7"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold">歷史訂單</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberOrder;
