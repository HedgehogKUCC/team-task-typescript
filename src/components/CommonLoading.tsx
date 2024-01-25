import React from "react";
import ReactLoading, { LoadingType } from "react-loading";

interface LoadingModalProps {
  type?: LoadingType;
  //   color?: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ type = "spin" }) => (
  <ReactLoading type={type} color="#bf9d7d" height={50} width={50} />
);

export default LoadingModal;
