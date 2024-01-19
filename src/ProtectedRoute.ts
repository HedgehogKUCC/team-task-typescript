import { useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiVerifyUserLogin } from './api/apiUser';
import { apiGetUserData } from './api/apiUser';
import { useAppDispatch } from "./store/hook";
import { setUserData } from "./store/slices/userSlice";

interface ProtectRouteProps {
  children: ReactNode;
}
const ProtectRoute = ({ children }: ProtectRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  useEffect(() => {

    const verifyUserLogin = async () => {
      const data = await apiVerifyUserLogin();
      if (!data) {
        navigate("/login");
        return null;
      } else {
        const getUserData = async () => {
          const data = await apiGetUserData();
          if (!data) {
            return;
          }
          dispatch(setUserData(data));
        };
        getUserData();
        //如果用戶已通過認證，則將他們重定向到他們原來要訪問的頁面。
      }

    };

    verifyUserLogin();

  }, [location]); // 添加 location 到依賴數組

  //如果用戶未通過認證，則將他們重定向到登錄頁面。
  //並將未通過認證的路由儲存為狀態，以便在用戶登錄後可以將他們重定向回來。

  return children;
};

export default ProtectRoute;