import "../components/component-styles/styles-summCard.css";
import { Maximize2 } from "lucide-react";
import type { EnhancedSearchResponse } from "../services/searchService";

interface cardProps {
  onClick?: () => void;
  className?: string;
  summaryText?: string;
  neutralityScore?: number;
  persuasionScore?: number;
  modalTitle?: string;
  modalContent?: string;
  searchData?: EnhancedSearchResponse | null; // Updated type
  searchType?: "url" | "prompt";
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
        // Enhanced data fallback
        quickAssessment: null,
        sourcesCount: 0,
      };
    }

    // Both search types now use the same enhanced structure
    return {
      summary: searchData.summary || "No summary available",
      neutrality: searchData.neutralityScore || 0.5,
      persuasion: searchData.persuasionScore || 0.5,
      title: "Research Summary",
      content: searchData.summary || "No content available",
      // Enhanced data
      quickAssessment: searchData.quickAssessment,
      sourcesCount: searchData.sources?.length || 0,
      biasAnalysis: searchData.biasAnalysis,
      researchQuality: searchData.researchQuality,
    };
  };

  const displayData = getDisplayData();

  // Get quality badge class based on neutrality
  const getNeutralityBadgeClass = () => {
    const neutrality = displayData.quickAssessment?.overallNeutrality;
    if (neutrality === "high") return "badge badge-success";
    if (neutrality === "moderate") return "badge badge-warning";
    if (neutrality === "low") return "badge badge-error";
    return "badge badge-ghost";
  };

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

        {/* Enhanced Quick Assessment */}
        {displayData.quickAssessment && (
          <div className="col-span-12 text-center items-center justify-center">
            <div className="flex items-center gap-4 mb-3">
              <div className={getNeutralityBadgeClass()}>
                {displayData.quickAssessment.overallNeutrality?.toUpperCase()}{" "}
                NEUTRALITY
              </div>
              {displayData.researchQuality && (
                <div
                  className={`badge ${
                    displayData.researchQuality.rating === "high"
                      ? "badge-success"
                      : displayData.researchQuality.rating === "medium"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {displayData.researchQuality.rating?.toUpperCase()} QUALITY
                </div>
              )}
            </div>
            <p className="text-sm text-base-content/70">
              {displayData.quickAssessment.keyConsideration}
            </p>
          </div>
        )}

        <div className="col-span-12 neutrality-score">
          <div className="flex grid-cols-2 gap-4">
            <div className="text-center">
              <h4 className="summ-score">Neutrality</h4>
              <p className="text-lg font-bold text-primary">
                {displayData.neutrality.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <h4 className="summ-score">Persuasion</h4>
              <p className="text-lg font-bold text-secondary">
                {displayData.persuasion.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <p className="summ-summary">{displayData.summary}</p>
        </div>

        {/* Sources count and quick insights */}
        <div className="col-span-12 flex justify-between items-center text-sm text-base-content/70">
          <span>Found {displayData.sourcesCount} sources</span>
          {displayData.biasAnalysis && (
            <span className="text-info">
              {displayData.biasAnalysis.confidenceLevel} confidence
            </span>
          )}
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
        <div className="modal-box max-w-4xl">
          <h3 id="modal-title" className="text-lg font-bold mb-4">
            {displayData.title}
          </h3>

          {/* Enhanced modal content with bias analysis */}
          <div className="space-y-4">
            <p
              id="modal-desc"
              className="py-4 whitespace-pre-wrap border-b pb-4"
            >
              {displayData.content}
            </p>

            {/* Bias Analysis in Modal */}
            {displayData.biasAnalysis && (
              <div className="bg-base-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Bias Analysis</h4>
                <p className="text-sm mb-3">
                  {displayData.biasAnalysis.overallAssessment}
                </p>

                {displayData.biasAnalysis.keyFindings &&
                  displayData.biasAnalysis.keyFindings.length > 0 && (
                    <div className="mb-3">
                      <h5 className="font-semibold text-sm mb-1">
                        Key Findings:
                      </h5>
                      <ul className="text-sm list-disc list-inside">
                        {displayData.biasAnalysis.keyFindings
                          .slice(0, 3)
                          .map((finding: string, index: number) => (
                            <li key={index}>{finding}</li>
                          ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}
          </div>

          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn cursor-pointer">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummmaryCard;
