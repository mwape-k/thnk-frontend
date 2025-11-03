import CustomBtn from "./CustomBtn";
import "../components/component-styles/styles-popOver.css";
import { ArrowUpRight, Cross, Expand, X } from "lucide-react";

interface cardProps {
  onClick?: () => void;
  className?: string;
  hasLink?: boolean;
  onClose: () => void; // new prop for close event
}

interface PopoverCardProps extends cardProps {
  nodeData?: {
    label: string;
    summary?: string;
    neutralityScore?: number;
    persuasionScore?: number;
    sentimentScore?: number;
    tags?: string[];
    url?: string;
    sources?: string[];
    type?: string;
  };
}

const PopoverCard: React.FC<PopoverCardProps> = ({
  onClose,
  nodeData,
  className = "",
  hasLink = false,
}) => {
  if (!nodeData) return null;

  const handleSourceOpen = () => {
    if (nodeData?.url) {
      window.open(nodeData.url, "_blank", "noopener,noreferrer");
    }
    console.log("button pressed");
  };

  // Use nodeData values or fallback to placeholder text
  const neutralityScore =
    nodeData?.neutralityScore !== undefined
      ? nodeData.neutralityScore.toFixed(2)
      : "N/A";

  const summaryText = nodeData?.summary
    ? nodeData.summary
    : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati fugiat ratione dolore qui, a porro quod provident quis explicabo officia. Alias placeat magni reprehenderit architecto corrupti ad maxime soluta iusto?";

  return (
    <div className={`p-6 ${className}`}>
      <div className="pop-card-cont flex grid-cols-2 gap-4">
        <div className="col-span-12 w-full pl-2 pr-2 mb-1 mt-0">
          <div className="flex grid-cols-2 gap-8 items-center w-full justify-between">
            <div>
              <button className="btn btn-tertiary" onClick={onClose}>
                <X />
              </button>
            </div>
            <div>
              <button className="btn btn-secondary" onClick={handleSourceOpen}>
                <ArrowUpRight />
              </button>
            </div>
          </div>
        </div>
        <div className="col-span-12 flex justify-between items-center">
          <div className="flex grid-cols-2 items-center justify-between w-full scoring-card">
            <h4 className="pop-score text-center">
              Neutrality Score: {neutralityScore}
            </h4>
            {nodeData?.sentimentScore !== undefined && (
              <h4 className="pop-score text-center">
                Sentiment Score: {nodeData.sentimentScore.toFixed(2)}
              </h4>
            )}
          </div>
        </div>
        <div className="col-span-12">
          <p className="pop-summary">{summaryText}</p>
        </div>
        {hasLink && nodeData?.url && (
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
