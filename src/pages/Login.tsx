import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { apiUserLogin } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    const postData = {
      email: data.email.trim(),
      password: data.password,
    };

    setIsLoading(true);
    apiUserLogin(postData)
      .then(() => {
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

  return (
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
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-7">
            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check mb-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberAccount"
                />
                <label className="form-check-label" htmlFor="rememberAccount">
                  記住帳號
                </label>
              </div>
              <a className="d-block" href="#">
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
  );
};

export default Login;
