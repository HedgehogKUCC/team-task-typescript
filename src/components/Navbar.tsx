import { useRef } from "react";
import { Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../store/hook";
import { selectUser, setName, setToken } from "../store/slices/userSlice";

import ProfileIcon from "/ic_Profile.svg";
import styles from "../assets/scss/modules/navbar.module.scss";

type NavbarProps = {
  isEscapeDocumentFlow?: boolean;
  isShowMenu?: boolean;
};

const Navbar = ({
  isEscapeDocumentFlow = true,
  isShowMenu = true,
}: NavbarProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const UserName =
    user.name || localStorage.getItem("enjoyment_luxury_hotel_name");
  const UserToken =
    user.token || localStorage.getItem("enjoyment_luxury_hotel_token");

  const desktopNavRef = useRef<HTMLElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const barIconClickHandler = () => {
    if (desktopNavRef.current) {
      desktopNavRef.current.classList.remove("visible");
      desktopNavRef.current.classList.add("invisible");
    }

    if (mobileNavRef.current) {
      mobileNavRef.current.classList.remove("opacity-0");
      mobileNavRef.current.classList.add("opacity-100");
      mobileNavRef.current.style.zIndex = "1040";
      mobileNavRef.current.style.transitionDuration = ".5s";
    }
  };

  const xIconClickHandler = () => {
    if (desktopNavRef.current) {
      desktopNavRef.current.classList.remove("invisible");
      desktopNavRef.current.classList.add("visible");
    }

    if (mobileNavRef.current) {
      mobileNavRef.current.classList.remove("opacity-100");
      mobileNavRef.current.classList.add("opacity-0");
      mobileNavRef.current.style.zIndex = "-1";
      mobileNavRef.current.style.transitionDuration = "0s";
    }
  };

  const onClickLogoutHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("enjoyment_luxury_hotel_token");
    localStorage.removeItem("enjoyment_luxury_hotel_name");
    dispatch(setName(""));
    dispatch(setToken(""));
  };

  return (
    <>
      <nav
        className={`py-3 py-xxl-5 fixed-top ${
          isEscapeDocumentFlow ? "position-absolute" : "position-relative"
        }`}
        ref={desktopNavRef}
      >
        <div className="wider_container">
          <div className="d-flex justify-content-between align-items-center">
            <Link className="me-0 py-0 d-inline-block" to="/">
              <img
                width="196"
                src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/typescript-hotel/%E6%A1%8C%E6%A9%9F%E7%89%88/logo.png"
                alt=""
              />
            </Link>
            <div className="d-block d-md-none" onClick={barIconClickHandler}>
              <div className={styles.bar_icon_line_1}></div>
              <div className={styles.bar_icon_line_2}></div>
              <div className={styles.bar_icon_line_3}></div>
            </div>
            <ul
              className={`mb-0 list-unstyled d-none justify-content-center align-items-center ${
                isShowMenu ? "d-md-flex" : "d-md-none"
              }`}
            >
              <li className="me-3 d-flex">
                <Link
                  className="p-3 text-decoration-none text-white fw-bold"
                  to="/room"
                >
                  客房旅宿
                </Link>
              </li>
              <li className="me-3 d-flex">
                {UserToken ? (
                  <div className={`p-3 position-relative ${styles.user_area}`}>
                    <img className="me-2" src={ProfileIcon} alt="" />
                    {UserName}
                    <ul
                      style={{
                        width: "260px",
                        borderRadius: "20px",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        top: "55px",
                      }}
                      className="position-absolute end-0 list-unstyled bg-white"
                    >
                      <li
                        style={{
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px",
                        }}
                      >
                        <Link
                          className="p-3 d-flex text-decoration-none fw-bold"
                          to="/member"
                        >
                          我的帳戶
                        </Link>
                      </li>
                      <li
                        style={{
                          borderBottomLeftRadius: "5px",
                          borderBottomRightRadius: "5px",
                        }}
                      >
                        <a
                          className="p-3 d-flex text-decoration-none fw-bold"
                          href="#"
                          onClick={onClickLogoutHandler}
                        >
                          登出
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    className="p-3 text-decoration-none text-white fw-bold"
                    to="/login"
                  >
                    會員登入
                  </Link>
                )}
              </li>
              <li className="d-flex">
                <a
                  className="px-6 py-3 btn btn-primary text-white fw-bold"
                  href="#"
                >
                  立即訂房
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav
        style={{ transition: "all .5s linear", zIndex: -1 }}
        className="p-4 opacity-0 offcanvas-backdrop"
        ref={mobileNavRef}
      >
        <ul className="mb-0 h-100 list-unstyled d-flex flex-column d-md-none justify-content-center align-items-center text-white">
          <li className="mb-3 w-100 d-flex justify-content-center align-items-center">
            <Link
              className="p-3 w-100 d-flex justify-content-center align-items-center text-decoration-none text-white fw-bold"
              to="/room"
            >
              客房旅宿
            </Link>
          </li>
          <li className="mb-3 w-100 d-flex justify-content-center align-items-center">
            {UserToken ? (
              <Link
                className="p-3 w-100 d-flex justify-content-center align-items-center text-decoration-none text-white fw-bold"
                to="/member"
              >
                我的帳戶
              </Link>
            ) : (
              <Link
                className="p-3 w-100 d-flex justify-content-center align-items-center text-decoration-none text-white fw-bold"
                to="/login"
              >
                會員登入
              </Link>
            )}
          </li>
          <li className="mb-3 w-100 d-flex justify-content-center align-items-center">
            <a
              className="px-6 py-3 w-100 d-flex justify-content-center align-items-center btn btn-primary text-white fw-bold"
              href="#"
            >
              立即訂房
            </a>
          </li>
          {UserToken && (
            <li className="w-100 d-flex justify-content-center align-items-center">
              <a
                className="p-3 w-100 d-flex justify-content-center align-items-center text-decoration-none text-white fw-bold"
                href="#"
                onClick={onClickLogoutHandler}
              >
                登出
              </a>
            </li>
          )}
        </ul>
        <div className={styles.x_icon} onClick={xIconClickHandler}></div>
      </nav>
    </>
  );
};

export default Navbar;
