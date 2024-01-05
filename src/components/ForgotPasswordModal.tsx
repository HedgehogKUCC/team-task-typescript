import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { apiVerifyGenerateEmailCode } from "../api";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IForgotPasswordModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
}

interface IFormInputs {
  email: string;
  code: string;
  newPassword: string;
}

const ForgotPasswordModal = ({ modalRef }: IForgotPasswordModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShowNextForm, setIsShowNextForm] = useState(false);
  const [readonlyEmail, setReadonlyEmail] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmitEmailUserReceiveCode: SubmitHandler<IFormInputs> = (data) => {
    setIsLoading(true);
    apiVerifyGenerateEmailCode({ email: data.email.trim() })
      .then(() => {
        setIsShowNextForm(true);
        setReadonlyEmail(data.email.trim());
      })
      .catch((err) => {
        MySwal.fire({
          text: (err.response.data as { status: boolean; message: string })
            .message,
          icon: "error",
          showConfirmButton: false,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onSubmitNewPassword: SubmitHandler<IFormInputs> = (data) => {
    console.log("onSubmitNewPassword", data);
  };

  return (
    <div className="modal fade" tabIndex={-1} ref={modalRef}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-primary border-3">
          <div className="pb-0 modal-header border-bottom-0">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="pt-0 modal-body">
            <form
              className={`${isShowNextForm ? "d-none" : "d-block"}`}
              onSubmit={handleSubmit(onSubmitEmailUserReceiveCode)}
            >
              <div className="mb-3">
                <label className="form-label text_primary_60">電子信箱</label>
                <input
                  type="email"
                  className={`form-control border ${
                    errors.email ? "border-danger" : "border-primary"
                  } ${errors.email && "is-invalid border-3"}`}
                  placeholder="請輸入註冊時的電子信箱"
                  autoComplete="username"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "電子信箱 必填",
                    },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                      message: "電子信箱 格式有誤",
                    },
                  })}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold text-white"
                >
                  {isLoading ? (
                    <span
                      style={{ width: "1.5rem", height: "1.5rem" }}
                      className="spinner-border spinner-border-sm"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    "發送驗證碼"
                  )}
                </button>
              </div>
            </form>
            <form
              className={`${isShowNextForm ? "d-block" : "d-none"}`}
              onSubmit={handleSubmit(onSubmitNewPassword)}
            >
              <div className="mb-3">
                <label className="form-label text_primary_60">電子信箱</label>
                <input
                  type="email"
                  className="form-control border border-primary"
                  value={readonlyEmail}
                  disabled
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label text_primary_60">驗證碼</label>
                <input
                  type="text"
                  className={`form-control border ${
                    errors.code ? "border-danger" : "border-primary"
                  } ${errors.code && "is-invalid border-3"}`}
                  placeholder="請輸入驗證碼"
                  {...register("code", {
                    required: {
                      value: true,
                      message: "驗證碼 必填",
                    },
                    pattern: {
                      value: /^[a-zA-Z0-9]{6}$/g,
                      message: "驗證碼 格式有誤",
                    },
                  })}
                />
                {errors.code && (
                  <div className="invalid-feedback">{errors.code.message}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label text_primary_60">新密碼</label>
                <input
                  type="password"
                  className={`form-control border ${
                    errors.newPassword ? "border-danger" : "border-primary"
                  } ${errors.newPassword && "is-invalid border-3"}`}
                  autoComplete="current-password"
                  {...register("newPassword", {
                    required: {
                      value: true,
                      message: "新密碼 必填",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g,
                      message: "新密碼需至少 8 碼以上，並英數混合",
                    },
                  })}
                />
                {errors.newPassword && (
                  <div className="invalid-feedback">
                    {errors.newPassword.message}
                  </div>
                )}
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 fw-bold text-white"
                >
                  確認新密碼
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
