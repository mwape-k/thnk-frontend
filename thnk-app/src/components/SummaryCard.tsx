import "../components/component-styles/styles-summCard.css";
import { Maximize2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

// Define the normalized data interface that matches what ResultsPage sends
interface NormalizedSearchData {
  summary: string;
  neutralityScore: number;
  persuasionScore: number;
  sources: Array<{
    url: string;
    title: string;
    text: string;
    tags: string[];
    neutralityScore: number;
    sentimentScore: number;
    aiGenerated: boolean;
    credibilityScore?: number;
    domain?: string;
    sourceType?: string;
    verified?: boolean;
    scrapedSuccessfully?: boolean;
  }>;
  biasAnalysis?: any;
  sourceMetrics?: any;
  researchQuality?: any;
  quickAssessment?: any;
  mainContent?: any;
}

interface cardProps {
  onClick?: () => void;
  className?: string;
  summaryText?: string;
  neutralityScore?: number;
  persuasionScore?: number;
  modalTitle?: string;
  modalContent?: string;
  searchData?: NormalizedSearchData | null;
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
  console.log("SummaryCard received searchData:", searchData);
  console.log("SummaryCard searchType:", searchType);

  // Truncate summary for card display
  const truncateSummary = (text: string, maxLength: number = 200): string => {
    if (!text || text.length <= maxLength) return text;

    // Find the last space within the maxLength to avoid cutting words
    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  // Determine what to display based on search data and type
  const getDisplayData = () => {
    if (!searchData) {
      console.log("No searchData, using fallback values");
      return {
        summary: summaryText,
        truncatedSummary: truncateSummary(summaryText),
        neutrality: neutralityScore,
        persuasion: persuasionScore,
        title: modalTitle,
        content: modalContent,
        // Enhanced data fallback
        quickAssessment: null,
        sourcesCount: 0,
        biasAnalysis: null,
        researchQuality: null,
      };
    }

    console.log("Using searchData:", searchData);

    // Both search types now use the same normalized structure
    const fullSummary = searchData.summary || "No summary available";

    return {
      summary: fullSummary,
      truncatedSummary: truncateSummary(fullSummary),
      neutrality: searchData.neutralityScore || 0.5,
      persuasion: searchData.persuasionScore || 0.5,
      title: "Research Summary",
      content: fullSummary, // Full summary for modal
      // Enhanced data
      quickAssessment: searchData.quickAssessment,
      sourcesCount: searchData.sources?.length || 0,
      biasAnalysis: searchData.biasAnalysis,
      researchQuality: searchData.researchQuality,
    };
  };

  const displayData = getDisplayData();

  console.log("Display data:", displayData);
  console.log("Sources count:", displayData.sourcesCount);

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
          <div className="badge-container col-span-12 text-center items-center justify-center w-full">
            <div className="flex w-full grid-cols-2 justify-center items-center gap-4 mb-3">
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
              <p className="text-lg font-bold text-primary score-p">
                {displayData.neutrality.toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <h4 className="summ-score">Persuasion</h4>
              <p className="text-lg font-bold text-secondary score-p">
                {displayData.persuasion.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          {/* Truncated summary in card */}
          <p className="summ-summary">
            {displayData.truncatedSummary}
            {displayData.truncatedSummary !== displayData.summary && (
              <span
                className="text-primary cursor-pointer ml-1 font-semibold"
                onClick={() => document.getElementById("my_modal_6")?.click()}
              >
                Read more
              </span>
            )}
          </p>
        </div>

        {/* Sources count and quick insights */}
        <div className="col-span-12 flex justify-between items-center text-sm text-base-content/70 gap-2">
          <span>Found {displayData.sourcesCount} sources</span>
          {displayData.biasAnalysis && (
            <span className="text-secondary">
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
        <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
          <h3 id="modal-title" className="text-lg font-bold mb-4">
            {displayData.title}
          </h3>

          {/* Enhanced modal content with markdown rendering */}
          <div className="space-y-4">
            {/* Full summary with markdown rendering */}
            <div className="border-b pb-4">
              <h4 className="font-semibold mb-2 text-primary">Summary</h4>
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{displayData.content}</ReactMarkdown>
              </div>
            </div>

            {/* Bias Analysis in Modal */}
            {displayData.biasAnalysis && (
              <div className="bg-base-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Bias Analysis</h4>
                <div className="prose prose-sm max-w-none">
                  <ReactMarkdown>
                    {typeof displayData.biasAnalysis === "string"
                      ? displayData.biasAnalysis
                      : displayData.biasAnalysis.overallAssessment ||
                        "No bias analysis available"}
                  </ReactMarkdown>
                </div>

                {displayData.biasAnalysis &&
                  typeof displayData.biasAnalysis !== "string" &&
                  displayData.biasAnalysis.keyFindings &&
                  displayData.biasAnalysis.keyFindings.length > 0 && (
                    <div className="mt-3">
                      <h5 className="font-semibold text-sm mb-1">
                        Key Findings:
                      </h5>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {displayData.biasAnalysis.keyFindings
                          .slice(0, 3)
                          .map((finding: string, index: number) => (
                            <li key={index}>
                              <ReactMarkdown>{finding}</ReactMarkdown>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}

                {/* Critical Thinking Questions */}
                {displayData.biasAnalysis &&
                  typeof displayData.biasAnalysis !== "string" &&
                  displayData.biasAnalysis.criticalThinkingQuestions &&
                  displayData.biasAnalysis.criticalThinkingQuestions.length >
                    0 && (
                    <div className="mt-3">
                      <h5 className="font-semibold text-sm mb-1">
                        Critical Questions:
                      </h5>
                      <ul className="text-sm list-disc list-inside space-y-1">
                        {displayData.biasAnalysis.criticalThinkingQuestions
                          .slice(0, 5) // Show more questions in modal
                          .map((question: string, index: number) => (
                            <li key={index}>
                              <ReactMarkdown>{question}</ReactMarkdown>
                            </li>
                          ))}
                      </ul>
                    </div>
                  )}
              </div>
            )}

            {/* Source Metrics */}
            {displayData.sourcesCount > 0 && (
              <div className="bg-base-200 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Source Analysis</h4>
                <p className="text-sm">
                  Analyzed {displayData.sourcesCount} sources with an average
                  neutrality score of {displayData.neutrality.toFixed(2)}
                </p>
              </div>
            )}
          </div>

          <div className="modal-action sticky bottom-0 bg-base-100 pt-4 border-t">
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
