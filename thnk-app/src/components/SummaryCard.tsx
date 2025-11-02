import "../components/component-styles/styles-summCard.css";
import { Maximize2 } from "lucide-react";

interface cardProps {
  onClick?: () => void;
  className?: string;
  summaryText?: string;
  neutralityScore?: number;
  persuasionScore?: number;
  modalTitle?: string;
  modalContent?: string;
  searchData?: any; // Add search data prop
  searchType?: "url" | "prompt"; // Add search type prop
}

const SummmaryCard: React.FC<cardProps> = ({
  onClick,
  className = "",
  summaryText = "Lorem",
  neutralityScore = 0.3,
  persuasionScore = 0.6,
  modalTitle = "Title",
  modalContent = "Text",
  searchData = null,
  searchType = "prompt",
}) => {
  // Determine what to display based on search data and type
  const getDisplayData = () => {
    if (!searchData) {
      return {
        summary: summaryText,
        neutrality: neutralityScore,
        persuasion: persuasionScore,
        title: modalTitle,
        content: modalContent,
      };
    }

    if (searchType === "url") {
      // URL response structure
      return {
        summary:
          searchData.aiSummary ||
          searchData.main?.text ||
          "No summary available",
        neutrality:
          searchData.neutralityScore || searchData.main?.neutralityScore || 0.5,
        persuasion: searchData.persuasionScore || 0.5,
        title: searchData.main?.title || "URL Analysis",
        content:
          searchData.main?.text ||
          searchData.aiSummary ||
          "No content available",
      };
    } else {
      // Prompt response structure
      return {
        summary: searchData.summary || "No summary available",
        neutrality: searchData.neutralityScore || 0.5,
        persuasion: searchData.persuasionScore || 0.5,
        title: "Research Summary",
        content: searchData.summary || "No content available",
      };
    }
  };

  const displayData = getDisplayData();

  return (
    <div className={`p-6 ${className}`}>
      <div className="summ-card-cont flex grid-cols-2 gap-4">
        <div className="col-span-12 mb-4 header-card">
          <div className="flex w-full grid-cols-2 justify-center items-center text-center header-card-inner">
            <h4 className="summ-header-title">What THNK. found </h4>
            <span className="justify-end">
              <label
                htmlFor="my_modal_6"
                className="btn btn-neutral btn-dash rounded-full cursor-pointer"
              >
                <Maximize2 color="#fff" size={24} className="p-1" />
              </label>
            </span>
          </div>
        </div>
        <div className="col-span-12 neutrality-score">
          <div className="flex grid-cols-2">
            <h4 className="summ-score">
              Neutrality: {displayData.neutrality.toFixed(2)}
            </h4>
            <h4 className="summ-score">
              Persuasion: {displayData.persuasion.toFixed(2)}
            </h4>
          </div>
        </div>
        <div className="col-span-12">
          <p className="summ-summary">{displayData.summary}</p>
        </div>
      </div>

      {/* DaisyUI modal markup */}
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
      >
        <div className="modal-box">
          <h3 id="modal-title" className="text-lg font-bold">
            {displayData.title}
          </h3>
          <p id="modal-desc" className="py-4 whitespace-pre-wrap">
            {displayData.content}
          </p>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn cursor-pointer">
              Close!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummmaryCard;
