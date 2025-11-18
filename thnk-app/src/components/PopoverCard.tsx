import CustomBtn from "./CustomBtn";
import "../components/component-styles/styles-popOver.css";
import { ArrowUpRight, Expand, ExternalLink, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface cardProps {
  onClick?: () => void;
  className?: string;
  onClose: () => void;
}

// Define the normalized source interface
interface NormalizedSource {
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
    sources?: NormalizedSource[];
    type?: string;
    // Enhanced fields from backend - now properly typed
    biasAnalysis?:
      | {
          overallAssessment?: string;
          keyFindings?: string[];
          criticalThinkingQuestions?: string[];
          researchSuggestions?: string[];
          confidenceLevel?: string;
          biasIndicators?: {
            languagePatterns?: string[];
            perspectiveGaps?: string[];
            sourceDiversity?: string;
          };
        }
      | string; // Can be object or string
    sourceMetrics?: {
      neutralityRange?: { min: number; max: number; average: number };
      sentimentRange?: { min: number; max: number; average: number };
      credibilityRange?: { min: number; max: number; average: number };
      diversityScore?: number;
      scoreVariance?: number;
      balancedPerspectives?: boolean;
    };
    researchQuality?: {
      qualityScore?: number;
      factors?: string[];
      rating?: string;
    };
    quickAssessment?: {
      overallNeutrality?: string;
      perspectiveBalance?: string;
      researchQuality?: string;
      sourceCredibility?: string;
      keyConsideration?: string;
    };
  };
}

const PopoverCard: React.FC<PopoverCardProps> = ({
  onClose,
  nodeData,
  className = "",
}) => {
  if (!nodeData) return null;
  const navigate = useNavigate();

  const handleSourceOpen = () => {
    if (nodeData?.url) {
      window.open(nodeData.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleDeeperAnalysis = () => {
    console.log("Navigate to deeper analysis page");
    navigate("/deeper-analysis", {
      state: {
        nodeData,
        biasAnalysis: nodeData.biasAnalysis,
        sourceMetrics: nodeData.sourceMetrics,
        researchQuality: nodeData.researchQuality,
        quickAssessment: nodeData.quickAssessment,
      },
    });
  };

  // Use nodeData values or fallback to placeholder text
  const neutralityScore = nodeData?.neutralityScore?.toFixed(2) || "N/A";
  const persuasionScore = nodeData?.persuasionScore?.toFixed(2) || "N/A";
  const sentimentScore = nodeData?.sentimentScore?.toFixed(2) || "N/A";

  // Truncate summary for popover display
  const truncateSummary = (text: string, maxLength: number = 150): string => {
    if (!text || text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  const summaryText = nodeData?.summary
    ? truncateSummary(nodeData.summary)
    : "No summary available";

  // Check if we have enhanced data
  const hasEnhancedData =
    nodeData?.biasAnalysis ||
    nodeData?.quickAssessment ||
    nodeData?.researchQuality;

  // Get bias analysis text (handles both string and object formats)
  const getBiasAnalysisText = (): string => {
    if (!nodeData?.biasAnalysis) return "";

    if (typeof nodeData.biasAnalysis === "string") {
      return nodeData.biasAnalysis;
    }

    return (
      nodeData.biasAnalysis.overallAssessment || "No bias analysis available"
    );
  };

  // Get confidence level
  const getConfidenceLevel = (): string => {
    if (!nodeData?.biasAnalysis) return "";

    if (typeof nodeData.biasAnalysis === "string") {
      return "medium";
    }

    return nodeData.biasAnalysis.confidenceLevel || "medium";
  };

  // DaisyUI badge classes based on neutrality
  const getNeutralityBadgeClass = () => {
    const neutrality = nodeData.quickAssessment?.overallNeutrality;
    switch (neutrality) {
      case "high":
        return "badge badge-success";
      case "moderate":
        return "badge badge-warning";
      case "low":
        return "badge badge-error";
      default:
        return "badge badge-ghost";
    }
  };

  // Get research quality badge class
  const getResearchQualityBadgeClass = () => {
    const quality = nodeData.researchQuality?.rating;
    switch (quality) {
      case "high":
        return "badge badge-success";
      case "medium":
        return "badge badge-warning";
      case "low":
        return "badge badge-error";
      default:
        return "badge badge-ghost";
    }
  };

  // Get source credibility badge class
  const getSourceCredibilityBadgeClass = () => {
    const credibility = nodeData.quickAssessment?.sourceCredibility;
    switch (credibility) {
      case "high":
        return "badge badge-success";
      case "moderate":
        return "badge badge-warning";
      case "low":
        return "badge badge-error";
      default:
        return "badge badge-ghost";
    }
  };

  return (
    <div className={`p-6 ${className}`}>
      <div className="pop-card-cont flex grid-cols-2 gap-4">
        {/* Header with buttons */}
        <div className="col-span-12 w-full pl-2 pr-2 mb-1 mt-0">
          <div className="flex grid-cols-2 gap-8 items-center w-full justify-between">
            <div>
              <button
                className="btn btn-circle btn-sm btn-ghost"
                onClick={onClose}
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex gap-2">
              {nodeData?.url && (
                <button
                  className="btn btn-circle btn-sm btn-primary"
                  onClick={handleSourceOpen}
                  title="Open source"
                >
                  <ExternalLink size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Quick Assessment Badges */}
        {hasEnhancedData && (
          <div className="col-span-12 text-center items-center mb-2">
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {nodeData.quickAssessment?.overallNeutrality && (
                <div className={getNeutralityBadgeClass()}>
                  {nodeData.quickAssessment.overallNeutrality.toUpperCase()}{" "}
                  NEUTRALITY
                </div>
              )}
              {nodeData.researchQuality?.rating && (
                <div className={getResearchQualityBadgeClass()}>
                  {nodeData.researchQuality.rating.toUpperCase()} QUALITY
                </div>
              )}
              {nodeData.quickAssessment?.sourceCredibility && (
                <div className={getSourceCredibilityBadgeClass()}>
                  {nodeData.quickAssessment.sourceCredibility.toUpperCase()}{" "}
                  CREDIBILITY
                </div>
              )}
            </div>
            {nodeData.quickAssessment?.keyConsideration && (
              <p className="text-sm text-base-content/70 mt-1">
                {nodeData.quickAssessment.keyConsideration}
              </p>
            )}
          </div>
        )}

        {/* Scores */}
        <div className="col-span-12 flex justify-between items-center">
          <div className="flex grid-cols-3 items-center justify-between w-full scoring-card">
            <div className="text-center pop-score ">
              <h4>Neutrality</h4>
              <p className="text-lg font-bold text-primary">
                {neutralityScore}
              </p>
            </div>
            <div className="text-center pop-score ">
              <h4>Persuasion</h4>
              <p className="text-lg font-bold text-secondary">
                {persuasionScore}
              </p>
            </div>
            {nodeData?.sentimentScore !== undefined && (
              <div className="text-center pop-score ">
                <h4>Sentiment</h4>
                <p className="text-lg font-bold text-accent">
                  {sentimentScore}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="col-span-12">
          <p className="pop-summary text-base-content">{summaryText}</p>
          {nodeData?.summary && nodeData.summary.length > 150 && (
            <button
              className="text-primary text-sm font-semibold mt-1 hover:underline"
              onClick={handleDeeperAnalysis}
            >
              Read full analysis
            </button>
          )}
        </div>

        {/* Tags */}
        {nodeData?.tags && nodeData.tags.length > 0 && (
          <div className="col-span-12">
            <div className="flex flex-wrap gap-2">
              {nodeData.tags.slice(0, 5).map((tag, index) => (
                <div
                  key={index}
                  className="badge badge-tertiary badge-sm text-pink-300 font-semibold"
                >
                  {tag}
                </div>
              ))}
              {nodeData.tags.length > 5 && (
                <div className="badge badge-ghost badge-sm">
                  +{nodeData.tags.length - 5} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Source Info */}
        {nodeData?.url && (
          <div className="col-span-12 text-xs text-base-content/60">
            <p className="truncate">Source: {new URL(nodeData.url).hostname}</p>
          </div>
        )}

        {/* Action Button */}
        <div className="col-span-12">
          <CustomBtn
            onClick={handleDeeperAnalysis}
            text={hasEnhancedData ? "VIEW FULL ANALYSIS" : "THNK. DEEPER"}
            className="pop-btn btn-primary w-full"
            size="auto"
          />
        </div>

        {/* Quick Bias Insights Preview */}
        {hasEnhancedData && nodeData.biasAnalysis && (
          <div className="quick-in col-span-12 mt-2 p-3 bg-base-200 rounded-lg border border-base-300">
            <h5 className="text-sm font-semibold mb-1 flex items-center gap-2">
              <span>Quick Insights</span>
              {nodeData.biasAnalysis && (
                <span
                  className={`badge badge-xs font-bold ${
                    getConfidenceLevel() === "high"
                      ? "badge-success"
                      : getConfidenceLevel() === "medium"
                      ? "badge-warning"
                      : "badge-error"
                  }`}
                >
                  {getConfidenceLevel()} confidence
                </span>
              )}
            </h5>
            <div className="text-xs text-base-content prose prose-sm max-w-none">
              <ReactMarkdown>{getBiasAnalysisText()}</ReactMarkdown>
            </div>

            {/* Show first critical question if available */}
            {nodeData.biasAnalysis &&
              typeof nodeData.biasAnalysis === "object" &&
              nodeData.biasAnalysis.criticalThinkingQuestions &&
              nodeData.biasAnalysis.criticalThinkingQuestions.length > 0 && (
                <div className="mt-2 pt-2 border-t border-base-300">
                  <p className="text-xs font-semibold mb-1">Consider:</p>
                  <p className="text-xs italic">
                    "{nodeData.biasAnalysis.criticalThinkingQuestions[0]}"
                  </p>
                </div>
              )}
          </div>
        )}

        {/* Research Quality Factors */}
        {nodeData?.researchQuality?.factors &&
          nodeData.researchQuality.factors.length > 0 && (
            <div className="col-span-12 text-xs">
              <p className="font-semibold mb-1">Quality Factors:</p>
              <ul className="list-disc list-inside space-y-1">
                {nodeData.researchQuality.factors
                  .slice(0, 3)
                  .map((factor, index) => (
                    <li key={index}>{factor}</li>
                  ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default PopoverCard;
