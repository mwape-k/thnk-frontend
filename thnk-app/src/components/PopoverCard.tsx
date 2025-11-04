import CustomBtn from "./CustomBtn";
import "../components/component-styles/styles-popOver.css";
import { ArrowUpRight, Expand, ExternalLink, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface cardProps {
  onClick?: () => void;
  className?: string;
  onClose: () => void;
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
    sources?: any[];
    type?: string;
    // Enhanced fields from backend
    biasAnalysis?: {
      overallAssessment: string;
      keyFindings: string[];
      criticalThinkingQuestions: string[];
      researchSuggestions: string[];
      confidenceLevel: string;
      biasIndicators: {
        languagePatterns: string[];
        perspectiveGaps: string[];
        sourceDiversity: string;
      };
    };
    sourceMetrics?: {
      neutralityRange: { min: number; max: number; average: number };
      sentimentRange: { min: number; max: number; average: number };
      diversityScore: number;
      scoreVariance: number;
      balancedPerspectives: boolean;
    };
    researchQuality?: {
      qualityScore: number;
      factors: string[];
      rating: string;
    };
    quickAssessment?: {
      overallNeutrality: string;
      perspectiveBalance: string;
      researchQuality: string;
      keyConsideration: string;
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

  const summaryText = nodeData?.summary || "No summary available";

  // Quick assessment indicators
  const hasEnhancedData = nodeData?.biasAnalysis && nodeData?.quickAssessment;

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

        {/* Enhanced Quick Assessment Badge */}
        {hasEnhancedData && (
          <div className="col-span-12 text-center items-center mb-2">
            <div className={getNeutralityBadgeClass()}>
              {nodeData.quickAssessment?.overallNeutrality?.toUpperCase()}{" "}
              NEUTRALITY
            </div>
            <p className="text-sm text-base-content/70 mt-1">
              {nodeData.quickAssessment?.keyConsideration}
            </p>
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
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="col-span-12">
          <CustomBtn
            onClick={handleDeeperAnalysis}
            text={hasEnhancedData ? "VIEW BIAS ANALYSIS" : "THNK. deeper"}
            className="pop-btn btn-primary w-full"
            size="auto"
          />
        </div>

        {/* Quick Bias Insights Preview */}
        {hasEnhancedData && nodeData.biasAnalysis && (
          <div className="quick-in col-span-12 mt-2 p-3 bg-info/10 rounded-lg border border-info/20">
            <h5 className="text-amber-50 text-sm mb-1">Quick Insights:</h5>
            <p className="text-xs text-amber-50 ">
              {nodeData.biasAnalysis.overallAssessment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopoverCard;
