import { useForm, SubmitHandler } from "react-hook-form";

interface IForgotPasswordModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
}

interface IFormInputs {
  email: string;
  code: string;
  newPassword: string;
}

const ForgotPasswordModal = ({ modalRef }: IForgotPasswordModalProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ mode: "onTouched" });

  const onSubmitEmailUserReceiveCode: SubmitHandler<IFormInputs> = (data) => {
    console.log(data);
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
            <form onSubmit={handleSubmit(onSubmitEmailUserReceiveCode)}>
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
                  發送驗證碼
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
