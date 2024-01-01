import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="mx-auto pt-xxl-10 login_signUp_form_wrap">
      <div className="d-flex flex-column">
        <p className="mb-2 text-primary">享樂酒店，誠摯歡迎</p>
        <h1 className="mb-7">立即開始旅程</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              電子信箱
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="hello@example.com"
              autoComplete="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              密碼
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              autoComplete="current-password"
            />
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
              type="button"
              className="py-3 btn btn-light btn-lg w-100 fw-bold"
            >
              會員登入
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
