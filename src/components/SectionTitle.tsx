type SectionTitleProps = {
  text: string;
  color?: string;
  decoPosition?: string;
};

const SectionTitle = ({ text, color, decoPosition }: SectionTitleProps) => {
  return (
    <>
      <div
        className={`d-flex mb-7 mb-md-8 ${
          decoPosition === "bottom"
            ? "flex-column"
            : "flex-row align-items-center"
        }`}
      >
        <h4
          className={`h1 fw-bold flex-shrink-0 ${
            color === "#fff" ? "text-white" : "text-primary"
          } ${decoPosition === "bottom" ? "mb-5 mb-md-7" : "mb-0 me-7"}`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {text}
        </h4>
        <span
          className="w-100"
          style={{
            height: "2px",
            maxWidth: "140px",
            background: `linear-gradient(90deg, ${
              color === "#fff" ? "#fff" : "#BE9C7C"
            } , #fff)`,
          }}
        ></span>
      </div>
    </>
  );
};

export default SectionTitle;
