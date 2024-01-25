type ButtonType = {
  text: string;
  btnType: BtnType;
  fit?: Fit;
  isDisabled?: boolean;
  onClick?: () => void;
};

type BtnType = "primary" | "secondary" | "text";
type Fit = "content" | "container";

const Button = ({ text, btnType, isDisabled, fit, onClick }: ButtonType) => {
  return (
    <>
      <button
        type="button"
        className={`btn 
        ${
          btnType === "primary"
            ? "btn-primary text-white px-6 cus_primary_button"
            : ""
        }
        ${
          btnType === "secondary"
            ? "btn-outline-primary px-6 cus_secondary_button"
            : ""
        }
        ${btnType === "text" ? "btn-link" : ""}
        ${fit === "container" ? "w-100" : ""}
        `}
        disabled={isDisabled}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
