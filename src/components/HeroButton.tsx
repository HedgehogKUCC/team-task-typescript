type HeroButtonProps = {
  text: string;
  onClick?: () => void;
};

const HeroButton = ({ text, onClick }: HeroButtonProps) => {
  return (
    <>
      <button
        type="button"
        className="p-4 p-lg-6 p-xl-7 btn btn-light btn-lg w-100 fw-bold hero_button"
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default HeroButton;
