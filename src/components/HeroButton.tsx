type HeroButtonProps = {
  text: string;
};

const HeroButton = ({ text }: HeroButtonProps) => {
  return (
    <>
      <button
        type="button"
        className="p-md-7 p-4 btn btn-light btn-lg w-100 fw-bold hero_button"
      >
        {text}
      </button>
    </>
  );
};

export default HeroButton;
