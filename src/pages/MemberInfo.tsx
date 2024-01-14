import { useState, useEffect } from "react";
import Button from "../components/Button";
import { apiUserData } from "../api";

const MemberInfo = () => {
  // 使用者資料
  const [userData, setUserData] = useState({});

  const getUserData = async () => {
    const res = await apiUserData();
    console.log(res);
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="row">
        {/* 修改密碼 */}
        <div className="col-12 col-sm-6 col-md-5">
          <div
            className="bg-white p-5 p-sm-6 p-md-7 mb-5"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-7">修改密碼</h5>
            <form>
              <div className="mb-5">
                <label className="form-label text-gray-dark">電子信箱</label>
                <div className="text-black fw-bold text-break">
                  Jessica@exsample.com
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <label className="form-label text-gray-dark">密碼</label>
                  <div className="text-black fw-bold">⦁⦁⦁⦁⦁⦁⦁⦁⦁⦁</div>
                </div>
                <Button text="重設" btnType="text" />
              </div>
            </form>
          </div>
        </div>

        {/* 基本資料 */}
        <div className="col-12 col-sm-6 col-md-7">
          <div
            className="bg-white p-5 p-sm-6 p-md-7"
            style={{ borderRadius: "20px" }}
          >
            <h5 className="text-black fw-bold mb-7">基本資料</h5>
            <form>
              <div className="mb-5">
                <label className="form-label text-gray-dark">姓名</label>
                <div className="text-black fw-bold">Jessica Wang</div>
              </div>
              <div className="mb-5">
                <label className="form-label text-gray-dark">手機號碼</label>
                <div className="text-black fw-bold">+886 912 345 678</div>
              </div>
              <div className="mb-5">
                <label className="form-label text-gray-dark">生日</label>
                <div className="text-black fw-bold">1990 年 8 月 15 日</div>
              </div>
              <div className="mb-7">
                <label className="form-label text-gray-dark">地址</label>
                <div className="text-black fw-bold">
                  高雄市新興區六角路 123 號
                </div>
              </div>
              <Button text="編輯" btnType="secondary" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberInfo;
