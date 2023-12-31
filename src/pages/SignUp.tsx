import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useAppDispatch } from "../store/hook";
import { setEmail, setPassword } from "../store/slices/signUpSlice";

import { apiVerifyEmail } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

interface IApiVerifyEmailResponseData {
  state: boolean;
  result: {
    isEmailExists: boolean;
  };
  message?: string;
}

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(setEmail(data.email.trim()));
    dispatch(setPassword(data.password));

    setIsLoading(true);
    apiVerifyEmail({ email: data.email.trim() })
      .then((res) => {
        const isEmailExists = (res.data as IApiVerifyEmailResponseData).result
          .isEmailExists;

        if (isEmailExists) {
          MySwal.fire({
            text: "此電子信箱已被註冊",
            icon: "warning",
            showConfirmButton: false,
          });
        } else {
          navigate("fill_info");
        }
      })
      .catch((err) => {
        MySwal.fire({
          text: (err?.response?.data as IApiVerifyEmailResponseData)?.message,
          icon: "error",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="mx-auto pt-5 pt-xxl-8 login_signUp_form_wrap">
      <div className="d-flex flex-column">
        <p className="mb-2 text-primary">享樂酒店，誠摯歡迎</p>
        <h1 className="mb-3">立即註冊</h1>
        <div className="mb-7 py-3 d-flex justify-content-between align-items-center">
          <div>
            <div
              style={{ width: "32px", height: "32px" }}
              className="mx-auto mb-1 d-flex justify-content-center align-items-center bg-primary rounded-circle fw-bold"
            >
              1
            </div>
            <p className="mb-0">輸入信箱及密碼</p>
          </div>
          <div
            style={{ width: "188px", height: "2px" }}
            className="bg_neutral_60 d-none d-sm-block"
          ></div>
          <div
            style={{ width: "55px", height: "2px" }}
            className="bg_neutral_60 d-block d-sm-none"
          ></div>
          <div>
            <div
              style={{ width: "32px", height: "32px" }}
              className="mx-auto mb-1 d-flex justify-content-center align-items-center text_neutral_60 border_neutral_60 rounded-circle fw-bold"
            >
              2
            </div>
            <p className="mb-0 text_neutral_60">填寫基本資料</p>
          </div>
        </div>
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
              placeholder="請輸入密碼"
              autoComplete="new-password"
              {...register("password", {
                required: {
                  value: true,
                  message: "密碼 必填",
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
                  message: "密碼需至少 8 碼以上，並英數混合",
                },
              })}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>
            )}
          </div>
          <div className="mb-7">
            <label htmlFor="confirmPassword" className="form-label">
              確認密碼
            </label>
            <input
              type="password"
              className={`form-control ${
                errors.confirmPassword && "is-invalid border-3"
              }`}
              id="confirmPassword"
              placeholder="請再輸入一次密碼"
              autoComplete="new-password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "確認密碼 必填",
                },
                validate: (value) =>
                  value === watch("password") || "密碼不一致",
              })}
            />
            {errors.confirmPassword && (
              <div className="invalid-feedback">
                {errors.confirmPassword.message}
              </div>
            )}
          </div>
          <div className="mb-3">
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
                "下一步"
              )}
            </button>
          </div>
        </form>
        <div className="d-flex align-items-center">
          <p className="mb-0">已經有會員了嗎？</p>
          <Link className="ms-2" to="/login">
            立即登入
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
