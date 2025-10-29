import CustomBtn from "./CustomBtn";
import "../components/component-styles/styles-popOver.css";

interface cardProps {
  onClick?: () => void;
  className?: string;
  hasLink?: boolean;
  onClose: () => void; // new prop for close event
}

const PopoverCard: React.FC<cardProps> = ({
  onClick,
  className = "",
  hasLink = false,
  onClose,
}) => {
  const handleSourceOpen = () => {
    console.log("button pressed");
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="pop-card-cont flex grid-cols-2 gap-4">
        <div className="col-span-4 flex justify-end">
          <CustomBtn type="button" size="full" text="X" onClick={onClose} />
        </div>
        <div className="col-span-12 flex justify-between items-center">
          <div>
            <h4 className="pop-score">Neutrality Score: </h4>
            <h4 className="pop-score">Persuasion Score: </h4>
          </div>
          {/* Close button triggers onClose prop */}
        </div>
        <div className="col-span-12">
          <p className="pop-summary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati
            fugiat ratione dolore qui, a porro quod provident quis explicabo
            officia. Alias placeat magni reprehenderit architecto corrupti ad
            maxime soluta iusto?
          </p>
        </div>
        {hasLink && (
          <CustomBtn
            onClick={handleSourceOpen}
            text="view source"
            className="pop-btn"
            size="auto"
          />
        )}
      </div>
    </div>
  );
};

export default PopoverCard;
