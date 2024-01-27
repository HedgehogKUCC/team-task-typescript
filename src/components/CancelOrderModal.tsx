import Button from "./Button";

interface IForgotPasswordModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  hideModal: () => void;
}

const CancelOrderModal = ({
  modalRef,
  hideModal,
}: IForgotPasswordModalProps) => {
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
              <Button text="確定取消" btnType="primary" fit="container" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CancelOrderModal;
