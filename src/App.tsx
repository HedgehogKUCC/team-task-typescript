import { Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import MemberLayout from "./components/MemberLayout";
import LoginSignUpLayout from "./components/LoginSignUpLayout";
import {
  Home,
  Login,
  SignUp,
  SignUpFillInfo,
  Room,
  RoomDetail,
  ReserveRoom,
  ReserveRoomSuccess,
  MemberInfo,
  MemberOrder,
  NotFound,
} from "./pages";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <div className="bg-dark text-white">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<LoginSignUpLayout />}>
              <Route index element={<Login />}></Route>
            </Route>
            <Route path="/signup" element={<LoginSignUpLayout />}>
              <Route index element={<SignUp />}></Route>
              <Route path="fill_info" element={<SignUpFillInfo />}></Route>
            </Route>
            <Route path="/room" element={<Room />}></Route>
            <Route path="/room_detail" element={<RoomDetail />}></Route>
            <Route
              path="/reserve"
              element={
                <ProtectedRoute>
                  <ReserveRoom />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/reserve_success"
              element={
                <ProtectedRoute>
                  <ReserveRoomSuccess />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/member" element={<MemberLayout />}>
              <Route index element={<Navigate to="info" replace />}></Route>
              <Route path="info" element={<MemberInfo />}></Route>
              <Route path="order" element={<MemberOrder />}></Route>
            </Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
        </div>
      </Provider>
    </>
  );
};

export default App;
