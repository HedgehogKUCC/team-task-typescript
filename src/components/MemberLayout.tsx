import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import styles from "../assets/scss/modules/member.module.scss";
import { useAppSelector } from "../store/hook";
import { selectUser } from "../store/slices/userSlice";

const MemberLayout = () => {
  // Banner 資料
  const user = useAppSelector(selectUser);

  const localStorageName =
    localStorage.getItem("enjoyment_luxury_hotel_name") || "";

  const userName = user.name || localStorageName;

  // 選單資料
  const [tabList] = useState([
    {
      name: "個人資料",
      path: "info",
    },
    {
      name: "我的訂單",
      path: "order",
    },
  ]);

  return (
    <>
      <Navbar isEscapeDocumentFlow={false} />

      {/* Banner */}
      <header className={styles.member_header}>
        <div className="container">
          <div className="d-flex align-items-center">
            <img
              src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/user1.png?raw=true"
              alt="使用者頭像"
              className="me-5"
              style={{ width: "12%", maxWidth: "144px", minWidth: "72px" }}
            />
            <h1 className="fw-bold mb-0">Hello, {userName}</h1>
          </div>
        </div>
      </header>

      {/* 主要內容 */}
      <section>
        <div className="container">
          <ul className="list-unstyled d-flex my-7 my-sm-8">
            {tabList.map((item, index) => (
              <li key={index} className="d-block">
                <NavLink
                  to={`/member/${item.path}`}
                  className={`text-decoration-none fw-bold py-5 px-3 ${styles.member_tab}`}
                  style={({ isActive }) => {
                    return {
                      color: isActive ? "#BF9D7D" : "#fff",
                    };
                  }}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <Outlet />
        </div>
        <picture>
          <source
            srcSet="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E8%A1%8C%E5%8B%95%E7%89%88/line.png?raw=true"
            media="(max-width: 576px)"
          />
          <img
            src="https://github.com/hexschool/2022-web-layout-training/blob/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/line2.png?raw=true"
            className="img-fluid mt-7 mt-md-8 mt-sm-9"
            alt="裝飾性線條"
          />
        </picture>
      </section>
      <Footer />
    </>
  );
};

export default MemberLayout;
