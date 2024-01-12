import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import BeatLoader from "react-spinners/BeatLoader";
import logoImg from "../../public/LOGO.svg";

interface LoadingModalProps {
  isLoading: boolean;
}



const LoadingModal: React.FC<LoadingModalProps> = ({ isLoading }) => {
  const [modalHeight, setModalHeight] = useState('80%');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setModalHeight('45%');
      } else {
        setModalHeight('80%');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <Modal isOpen={isLoading}   style={{
      content:{
        backgroundColor: "#FFF",
        width: "80%",
        height: modalHeight,
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        borderRadius: "20px",
      },
      overlay:{
        backgroundColor: "rgba(0, 0, 0, 0.40)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }

    }}>
      <BeatLoader
        color="black"
        loading={isLoading}
        size={16}
        aria-label="Loading Spinner"
        data-testid="loader"
        style={{ paddingBottom: "60px" }}
      />
      <img
        className='mb-3'
        width="196"
        src={logoImg}
        alt="LOGO"
      />
      <p className='text-black' style={{fontSize:"24px"}}>正在處理你的預訂</p>
    </Modal>
  );
};

export default LoadingModal;