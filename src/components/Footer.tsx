import LineIcon from "/Line.png";
import IgIcon from "/IG.png";

const Footer = () => {
  return (
    <>
      {/* Desktop */}
      <section className="pt-8 pb-9 d-none d-xl-block">
        <div className="container">
          <div className="d-flex justify-content-between">
            <div>
              <figure className="mb-7">
                <img
                  width="196"
                  src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/logo.png"
                  alt=""
                />
              </figure>
              <figure className="mb-8">
                <img className="me-3" src={LineIcon} alt="" />
                <img src={IgIcon} alt="" />
              </figure>
              <p className="mb-0">806023 台灣高雄市新興區六角路123號</p>
            </div>
            <div>
              <div className="d-flex mb-7">
                <div className="me-8">
                  <p className="mb-2 fw-bold">TEL</p>
                  <p className="mb-0">+886-7-1234567</p>
                </div>
                <div>
                  <p className="mb-2 fw-bold">MAIL</p>
                  <p className="mb-0">elh@hexschool.com</p>
                </div>
              </div>
              <div className="d-flex mb-8">
                <div className="me-8">
                  <p className="mb-2 fw-bold">FAX</p>
                  <p className="mb-0">+886-7-1234567</p>
                </div>
                <div>
                  <p className="mb-2 fw-bold">WEB</p>
                  <p className="mb-0">www.elhhexschool.com.tw</p>
                </div>
              </div>
              <p className="mb-0 text-end">
                © 享樂酒店 2023 All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Mobile */}
      <section
        style={{ paddingLeft: "12px", paddingRight: "12px" }}
        className="py-8 d-block d-xl-none"
      >
        <div className="row justify-content-center">
          <div className="col-12 col-sm-7 col-lg-4">
            <figure className="mb-7">
              <img
                width="196"
                src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/logo.png"
                alt=""
              />
            </figure>
            <figure className="mb-7">
              <img className="me-3" src={LineIcon} alt="" />
              <img src={IgIcon} alt="" />
            </figure>
            <div className="mb-3">
              <p className="mb-2 fw-bold">TEL</p>
              <p className="mb-0">+886-7-1234567</p>
            </div>
            <div className="mb-3">
              <p className="mb-2 fw-bold">FAX</p>
              <p className="mb-0">+886-7-1234567</p>
            </div>
            <div className="mb-3">
              <p className="mb-2 fw-bold">MAIL</p>
              <p className="mb-0">elh@hexschool.com</p>
            </div>
            <div className="mb-8">
              <p className="mb-2 fw-bold">WEB</p>
              <p className="mb-0">www.elhhexschool.com.tw</p>
            </div>
            <p>806023 台灣高雄市新興區六角路123號</p>
            <p className="mb-0">© 享樂酒店 2023 All Rights Reserved.</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;
