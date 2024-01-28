import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { apiGetRoomList } from "../api/apiRoom";
import type { IRoomListData } from "../api/interface/room";
import SizeIcon from "/ic_Size.svg";
import BedIcon from "/ic_Bed.svg";
import PersonIcon from "/ic_Person.svg";
import LoadingModal from "./CommonLoading";

interface LoadingModalProps {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  setSelectRoomId: (id: string) => void;
  currentRoomId: string;
}

const EditRoomModal: React.FC<LoadingModalProps> = ({
  openModal,
  setOpenModal,
  setSelectRoomId,
  currentRoomId,
}) => {
  const [roomList, setRoomList] = useState<IRoomListData>();
  const [isLoading, setLoading] = useState(true);
  const getRoomList = async () => {
    const res = await apiGetRoomList();
    if (res) {
      setRoomList(res);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    setLoading(true);

    getRoomList();
  }, []);

  return (
    <Modal
      isOpen={openModal}
      onRequestClose={() => setOpenModal(false)}
      className="_room_section_9i221_17939"
      style={{
        content: {
          backgroundColor: "white",
          width: "80%",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "20px",
          padding: "0",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.40)",
          backdropFilter: "blur(10px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      }}
    >
      <div className="container-fluid px-0 h-100 edit-room">
        {isLoading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "50vw" }}
          >
            <LoadingModal />
          </div>
        )}
        {!isLoading && (
          <Swiper
            slidesPerView={1}
            spaceBetween={80}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            breakpoints={{
              768: {
                slidesPerView: 1,
              },
              1200: {
                slidesPerView: 1,
              },
            }}
            style={{ borderRadius: "20px" }}
          >
            {roomList?.result.map((room) => (
              <SwiperSlide key={room._id} className="h-100 d-flex flex-column">
                <div className="row flex-grow-1 justify-content-center align-items-center">
                  <div className="col-12 col-md-6 px-0 mb-md-0 mb-3">
                    <img
                      src={room.imageUrl}
                      className="col w-100 vh-md-60"
                      alt=""
                    />
                  </div>
                  <div className="content col-12 col-md-6 px-3  pb-md-0 pb-5 vh-md-60 d-flex align-items-center justify-content-center">
                    <div className="row justify-content-center align-items-center w-100 pt-3">
                      <h3 className="fw-bold fs-md-3 fs-6">{room.name}</h3>
                      <div className="row justify-content-center align-items-center">
                        <div className="col-4 rounded-8  h-50 bg-white  p-md-3  mb-md-3 border-primary text-center">
                          <img
                            className="mb-2 mx-auto "
                            src={PersonIcon}
                            alt="Person Icon"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <p className="fw-bold text-center ">
                            1-{room.maxPeople}人
                          </p>
                        </div>
                        <div className="col-4  rounded-8 bg-white  p-md-3  mb-md-3 border-primary text-center">
                          <img
                            className="mb-2 mx-auto"
                            src={SizeIcon}
                            alt="Person Icon"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <p className="fw-bold text-center">{room.areaInfo}</p>
                        </div>
                        <div className="col-4  rounded-8 bg-white  p-md-3  mb-md-3 border-primary text-center">
                          <img
                            className="mb-2 mx-auto"
                            src={BedIcon}
                            alt="Person Icon"
                            style={{ width: "30px", height: "30px" }}
                          />
                          <p className="text-center">{room.bedInfo}</p>
                        </div>
                      </div>
                      <p>{room.description}</p>
                      <p className="fs-6 fs-md-3 mb-7  text-primary">
                        1晚/${room.price}
                      </p>
                      <button
                        className="btn btn-primary text-white d-flex align-items-center justify-content-center"
                        style={{ width: "80%" }}
                        onClick={() => {
                          setSelectRoomId(room._id);
                          setOpenModal(false);
                        }}
                        disabled={currentRoomId === room._id}
                      >
                        選擇房型
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </Modal>
  );
};

export default EditRoomModal;
