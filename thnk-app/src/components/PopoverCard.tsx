import "../components/component-styles/styles-popOver.css";
import CustomBtn from "./CustomBtn";

interface cardProps {
  onClick?: () => void;
  className?: string;
  hasLink?: boolean;
}

const PopoverCard: React.FC<cardProps> = ({
  onClick,
  className = "",
  hasLink = false,
}) => {
  const handleSourceOpen = () => {
    console.log("button pressed");
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="pop-card-cont flex grid-cols-2 gap-4">
        <div className="col-span-12">
          <div className="flex grid-cols-2">
            <h4 className="pop-score">Neutrality Score: </h4>
            <h4 className="pop-score">Persuasion Score: </h4>
          </div>
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
