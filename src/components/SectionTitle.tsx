type SectionTitleProps = {
  text: string;
};

const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <>
      <div
        className="d-flex flex-column mb-7 mb-md-8"
        style={{ maxWidth: "140px" }}
      >
        <h4
          className="h1 text-primary fw-bold mb-5 mb-md-7"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text}
        </h4>
        <span
          className="w-100"
          style={{
            height: "2px",
            background: "linear-gradient(90deg, #BE9C7C, #fff)",
          }}
        ></span>
      </div>
    </>
  );
};

export default SectionTitle;
