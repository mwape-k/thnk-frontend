interface BtnGroupProps {
  btnTextA: string;
  btnTextB: string;
  defaultSelected?: "A" | "B";
  onButtonChange?: (selected: "A" | "B") => void;
}

const ButtonGroup: React.FC<BtnGroupProps> = ({
  btnTextA = "Button A",
  btnTextB = "Button B",
  defaultSelected = "A",
  onButtonChange,
}) => {
  const handleChange = (selected: "A" | "B") => {
    onButtonChange?.(selected);
  };

  return (
    <div className="join">
      <input
        className="join-item btn"
        type="radio"
        name="options"
        aria-label={btnTextA}
        defaultChecked={defaultSelected === "A"}
        onChange={() => handleChange("A")}
      />
      <input
        className="join-item btn"
        type="radio"
        name="options"
        aria-label={btnTextB}
        defaultChecked={defaultSelected === "B"}
        onChange={() => handleChange("B")}
      />
    </div>
  );
};

export default ButtonGroup;
