interface buttonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  isLoading?: boolean;
  Disabled?: boolean;
  size?: "full" | "large" | "medium" | "small" | "auto";
}

const CustomBtn: React.FC<buttonProps> = ({
  text = "Button text",
  onClick,
  className = "",
  type = "button",
  isLoading = false,
  Disabled = false,
  size = "full",
}) => {
  return (
    <button
      type={type}
      className={`btn btn-primary custom-button custom-button--${size} ${className} ${
        isLoading ? "custom-button--isLoading" : ""
      }
        ${Disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
      onClick={onClick}
    >
      <span className="custom-button__text">{text}</span>
    </button>
  );
};

export default CustomBtn;
