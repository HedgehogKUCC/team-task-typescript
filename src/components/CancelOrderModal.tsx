import Button from "./Button";

import { apiOrderDelete } from "../api/index";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

interface IForgotPasswordModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  cancelID: string;
  hideModal: () => void;
  reloadOrderList: () => void;
}

const CancelOrderModal = ({
  modalRef,
  cancelID,
  hideModal,
  reloadOrderList,
}: IForgotPasswordModalProps) => {
  const cancelOrder = async () => {
    try {
      const res = await apiOrderDelete(cancelID);
      if (res.status) {
        MySwal.fire({
          text: "訂單取消成功",
          icon: "success",
          showConfirmButton: false,
          timer: 1200,
        });
      }

      hideModal();
      window.scrollTo(0, 0);
      reloadOrderList();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      MySwal.fire({
        text: error.response.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <>
      <div className="modal fade" tabIndex={-1} ref={modalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 pb-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-gray-dark">
              <p className="h6 text-center fw-bold my-7">
                確定要取消此房型的預訂嗎？
              </p>
            </div>
            <div className="modal-footer flex-nowrap">
              <Button
                text="關閉視窗"
                btnType="secondary"
                fit="container"
                onClick={() => hideModal()}
              />
              <Button
                text="確定取消"
                btnType="primary"
                fit="container"
                onClick={() => cancelOrder()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelOrderModal;
