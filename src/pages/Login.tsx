import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../store/hook";
import { setName, setToken } from "../store/slices/userSlice";

import { apiUserLogin } from "../api";
import ForgotPasswordModal from "../components/ForgotPasswordModal";

import Modal from "bootstrap/js/dist/modal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IFormInputs {
  email: string;
  password: string;
}

interface IApiUserLoginResponseData {
  status: boolean;
  token: string;
  result: {
    address: {
      zipcode: number;
      detail: string;
      county: string;
      city: string;
    };
    id: string;
    _id: string;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    createdAt: string;
    updatedAt: string;
  };
}

let forgotPasswordModal: Modal | null = null;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isRememberAccount, setIsRememberAccount] = useState(false);

  const localStorageEmail =
    localStorage.getItem("enjoyment_luxury_hotel_email") || "";

  const modalRef = useRef<HTMLDivElement>(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    if (isRememberAccount) {
      localStorage.setItem("enjoyment_luxury_hotel_email", data.email.trim());
    }

    const postData = {
      email: data.email.trim(),
      password: data.password,
    };

    setIsLoading(true);
    apiUserLogin(postData)
      .then((res) => {
        const tempData = res.data as IApiUserLoginResponseData;
        dispatch(setName(tempData.result.name));
        dispatch(setToken(tempData.token));

        localStorage.setItem(
          "enjoyment_luxury_hotel_name",
          tempData.result.name,
        );
        localStorage.setItem("enjoyment_luxury_hotel_token", tempData.token);

        MySwal.fire({
          text: "登入成功",
          icon: "success",
          showConfirmButton: false,
        }).then(() => {
          navigate("/");
        });
      })
      .catch(() => {
        MySwal.fire({
          text: "電子信箱或密碼有誤",
          icon: "error",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClickOpenModalHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    forgotPasswordModal!.show();
  };

  useEffect(() => {
    forgotPasswordModal = new Modal(modalRef.current!);

    if (localStorageEmail) {
      setValue("email", localStorageEmail);
      setIsRememberAccount(true);
    }
  }, []);

  useEffect(() => {
    const tempEmail = getValues("email").trim();

    if (!localStorageEmail) {
      if (isRememberAccount && tempEmail) {
        localStorage.setItem("enjoyment_luxury_hotel_email", tempEmail);
      }
    } else {
      if (!isRememberAccount) {
        localStorage.removeItem("enjoyment_luxury_hotel_email");
      }
    }
  }, [isRememberAccount]);

  return (
    <>
      <ForgotPasswordModal modalRef={modalRef} />
      <div className="mx-auto pt-xxl-10 login_signUp_form_wrap">
        <div className="d-flex flex-column">
          <p className="mb-2 text-primary">享樂酒店，誠摯歡迎</p>
          <h1 className="mb-7">立即開始旅程</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                電子信箱
              </label>
              <input
                type="email"
                className={`form-control ${
                  errors.email && "is-invalid border-3"
                }`}
                id="email"
                placeholder="hello@example.com"
                autoComplete="username"
                {...register("email", {
                  required: {
                    value: true,
                    message: "電子信箱 必填",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                    message: "電子信箱 格式有誤",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                密碼
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password && "is-invalid border-3"
                }`}
                id="password"
                autoComplete="current-password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "密碼 必填",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>
            <div className="mb-7">
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberAccount"
                    checked={isRememberAccount}
                    onChange={(e) => setIsRememberAccount(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="rememberAccount">
                    記住帳號
                  </label>
                </div>
                <a
                  className="d-block"
                  href="#"
                  onClick={onClickOpenModalHandler}
                >
                  忘記密碼？
                </a>
              </div>
            </div>
            <div className="mb-7">
              <button
                type="submit"
                className="py-3 btn btn-light btn-lg w-100 fw-bold"
              >
                {isLoading ? (
                  <span
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "會員登入"
                )}
              </button>
            </div>
          </form>
          <div className="d-flex align-items-center">
            <p className="mb-0">沒有會員嗎？</p>
            <Link className="ms-2" to="/signup">
              前往註冊
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
