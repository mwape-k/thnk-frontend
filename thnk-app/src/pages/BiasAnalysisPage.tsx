import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";
import "../styles/page-seek-deeper.css";
import ReactMarkdown from "react-markdown";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
} from "lucide-react";

// Define the enhanced data interfaces
interface BiasAnalysisData {
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

interface SourceMetricsData {
  neutralityRange?: { min: number; max: number; average: number };
  sentimentRange?: { min: number; max: number; average: number };
  credibilityRange?: { min: number; max: number; average: number };
  diversityScore?: number;
  scoreVariance?: number;
  balancedPerspectives?: boolean;
}

interface ResearchQualityData {
  qualityScore?: number;
  factors?: string[];
  rating?: string;
}

interface QuickAssessmentData {
  overallNeutrality?: string;
  perspectiveBalance?: string;
  researchQuality?: string;
  sourceCredibility?: string;
  keyConsideration?: string;
}

interface NodeData {
  label?: string;
  summary?: string;
  neutralityScore?: number;
  persuasionScore?: number;
  sentimentScore?: number;
  tags?: string[];
  url?: string;
  biasAnalysis?: BiasAnalysisData | string;
  sourceMetrics?: SourceMetricsData;
  researchQuality?: ResearchQualityData;
  quickAssessment?: QuickAssessmentData;
}

export default function BiasAnalysisPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract enhanced data from navigation state with proper typing
  const nodeData: NodeData = state?.nodeData || {};
  const biasAnalysis: BiasAnalysisData | string = state?.biasAnalysis || {};
  const sourceMetrics: SourceMetricsData = state?.sourceMetrics || {};
  const researchQuality: ResearchQualityData = state?.researchQuality || {};
  const quickAssessment: QuickAssessmentData = state?.quickAssessment || {};

  const handleRedirect = () => {
    navigate(-1);
  };

  const handleOpenURL = () => {
    if (nodeData?.url) {
      window.open(nodeData.url, "_blank", "noopener,noreferrer");
    }
  };

  // Helper function to get bias analysis text
  const getBiasAnalysisText = (): string => {
    if (!biasAnalysis) return "No bias analysis available";

    if (typeof biasAnalysis === "string") {
      return biasAnalysis;
    }

    return biasAnalysis.overallAssessment || "No bias analysis available";
  };

  // Helper function to get bias analysis object
  const getBiasAnalysisObject = (): BiasAnalysisData => {
    if (typeof biasAnalysis === "string") {
      return {
        overallAssessment: biasAnalysis,
      };
    }
    return biasAnalysis;
  };

  // DaisyUI badge classes
  const getQualityBadge = (rating: string = "medium") => {
    switch (rating.toLowerCase()) {
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

  const getNeutralityBadge = (neutrality: string = "medium") => {
    switch (neutrality.toLowerCase()) {
      case "high":
        return "badge badge-success badge-lg";
      case "moderate":
      case "medium":
        return "badge badge-warning badge-lg";
      case "low":
        return "badge badge-error badge-lg";
      default:
        return "badge badge-ghost badge-lg";
    }
  };

  const getConfidenceBadge = (confidence: string = "medium") => {
    switch (confidence.toLowerCase()) {
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

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <CustomBtn
            size="auto"
            type="button"
            text="Go Back"
            onClick={handleRedirect}
            className="btn-dash"
          />
          <div className="text-center">
            <h1 className="text-2xl text-base-content">Bias Analysis</h1>
            <p className="text-base-content/70">
              Comprehensive media literacy assessment
            </p>
          </div>
          {nodeData?.url && (
            <CustomBtn
              text="Visit Source"
              type="button"
              size="auto"
              onClick={handleOpenURL}
              className="btn-dash"
            />
          )}
        </div>

        {/* Source Information */}
        {nodeData.label && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-cust-title card-title text-2xl">
                Source Information
              </h2>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold">Title</h3>
                  <p className="text-base-content/80">{nodeData.label}</p>
                </div>
                {nodeData.url && (
                  <div>
                    <h3 className="font-semibold">URL</h3>
                    <p className="text-base-content/80 break-all">
                      {nodeData.url}
                    </p>
                  </div>
                )}
                {nodeData.summary && (
                  <div>
                    <h3 className="font-semibold">Summary</h3>
                    <div className="prose prose-sm max-w-none">
                      <ReactMarkdown>{nodeData.summary}</ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Assessment Summary */}
        {(quickAssessment || nodeData.quickAssessment) && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-cust-title card-title text-2xl">
                Quick Assessment
              </h2>

              <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat place-items-center">
                  <div className="stat-title">Overall Neutrality</div>
                  <div
                    className={getNeutralityBadge(
                      quickAssessment.overallNeutrality ||
                        nodeData.quickAssessment?.overallNeutrality
                    )}
                  >
                    {(
                      quickAssessment.overallNeutrality ||
                      nodeData.quickAssessment?.overallNeutrality ||
                      "MEDIUM"
                    ).toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Perspective Balance</div>
                  <div
                    className={`badge badge-lg ${
                      (quickAssessment.perspectiveBalance ||
                        nodeData.quickAssessment?.perspectiveBalance) ===
                      "balanced"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {(
                      quickAssessment.perspectiveBalance ||
                      nodeData.quickAssessment?.perspectiveBalance ||
                      "BALANCED"
                    ).toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Research Quality</div>
                  <div
                    className={getQualityBadge(
                      quickAssessment.researchQuality ||
                        nodeData.quickAssessment?.researchQuality
                    )}
                  >
                    {(
                      quickAssessment.researchQuality ||
                      nodeData.quickAssessment?.researchQuality ||
                      "MEDIUM"
                    ).toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Neutrality Score</div>
                  <div className="stat-value text-primary">
                    {nodeData.neutralityScore?.toFixed(2) || "0.50"}
                  </div>
                </div>
              </div>

              {(quickAssessment.keyConsideration ||
                nodeData.quickAssessment?.keyConsideration) && (
                <div className="alert alert-info mt-4">
                  <AlertCircle />
                  <span>
                    {quickAssessment.keyConsideration ||
                      nodeData.quickAssessment?.keyConsideration}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bias Analysis Section */}
        {(biasAnalysis || nodeData.biasAnalysis) && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-cust-title card-title text-2xl">
                  Bias Analysis
                </h2>
                {getBiasAnalysisObject().confidenceLevel && (
                  <div
                    className={getConfidenceBadge(
                      getBiasAnalysisObject().confidenceLevel
                    )}
                  >
                    {getBiasAnalysisObject().confidenceLevel?.toUpperCase()}{" "}
                    CONFIDENCE
                  </div>
                )}
              </div>

              <div className="space-y-6">
                {/* Overall Assessment */}
                <div>
                  <h3 className="text-lg mb-3">Overall Assessment</h3>
                  <div className="prose prose-lg max-w-none text-base-content/80 leading-relaxed">
                    <ReactMarkdown>{getBiasAnalysisText()}</ReactMarkdown>
                  </div>
                </div>

                {/* Key Findings */}
                {getBiasAnalysisObject().keyFindings &&
                  getBiasAnalysisObject().keyFindings!.length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">Key Findings</h3>
                      <ul className="space-y-2">
                        {getBiasAnalysisObject().keyFindings!.map(
                          (finding, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-2 pb-4 items-center"
                            >
                              <div className="badge badge-primary badge-sm p-0 mt-0 w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 size={16} strokeWidth={2} />
                              </div>
                              <span className="text-base-content/80">
                                <ReactMarkdown>{finding}</ReactMarkdown>
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Critical Thinking Questions */}
                {getBiasAnalysisObject().criticalThinkingQuestions &&
                  getBiasAnalysisObject().criticalThinkingQuestions!.length >
                    0 && (
                    <div>
                      <h3 className="text-lg mb-3">
                        Critical Thinking Questions
                      </h3>
                      <div className="space-y-3">
                        {getBiasAnalysisObject().criticalThinkingQuestions!.map(
                          (question, index) => (
                            <div key={index} className="alert alert-warning">
                              <AlertTriangle size={20} strokeWidth={2} />
                              <span className="question-text">
                                <ReactMarkdown>{question}</ReactMarkdown>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Research Suggestions */}
                {getBiasAnalysisObject().researchSuggestions &&
                  getBiasAnalysisObject().researchSuggestions!.length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">Research Suggestions</h3>
                      <div className="space-y-2">
                        {getBiasAnalysisObject().researchSuggestions!.map(
                          (suggestion, index) => (
                            <div
                              key={index}
                              className="flex items-start gap-3 pb-3"
                            >
                              <div className="badge badge-accent badge-sm mt-1 w-6 h-6 flex items-center justify-center flex-shrink-0">
                                <Lightbulb size={14} />
                              </div>
                              <span className="text-base-content/90">
                                <ReactMarkdown>{suggestion}</ReactMarkdown>
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Bias Indicators */}
                {getBiasAnalysisObject().biasIndicators && (
                  <div>
                    <h3 className="text-lg mb-3">Bias Indicators</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {getBiasAnalysisObject().biasIndicators!
                        .languagePatterns &&
                        getBiasAnalysisObject().biasIndicators!
                          .languagePatterns!.length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">
                              Language Patterns
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {getBiasAnalysisObject()
                                .biasIndicators!.languagePatterns!.slice(0, 3)
                                .map((pattern, index) => (
                                  <li key={index}>{pattern}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                      {getBiasAnalysisObject().biasIndicators!
                        .perspectiveGaps &&
                        getBiasAnalysisObject().biasIndicators!.perspectiveGaps!
                          .length > 0 && (
                          <div>
                            <h4 className="font-semibold mb-2">
                              Perspective Gaps
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                              {getBiasAnalysisObject()
                                .biasIndicators!.perspectiveGaps!.slice(0, 3)
                                .map((gap, index) => (
                                  <li key={index}>{gap}</li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Source Metrics */}
        {(sourceMetrics || nodeData.sourceMetrics) && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-cust-title card-title text-2xl">
                Source Analysis
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Neutrality Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-semibold text-primary">
                        {(
                          sourceMetrics.neutralityRange?.average ||
                          nodeData.sourceMetrics?.neutralityRange?.average ||
                          0.5
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Range:</span>
                      <span className="font-semibold">
                        {(
                          sourceMetrics.neutralityRange?.min ||
                          nodeData.sourceMetrics?.neutralityRange?.min ||
                          0
                        ).toFixed(2)}{" "}
                        -{" "}
                        {(
                          sourceMetrics.neutralityRange?.max ||
                          nodeData.sourceMetrics?.neutralityRange?.max ||
                          1
                        ).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diversity Score:</span>
                      <span className="font-semibold text-secondary">
                        {(
                          (sourceMetrics.diversityScore ||
                            nodeData.sourceMetrics?.diversityScore ||
                            0) * 100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Perspective Analysis</h3>
                  <div
                    className={`alert ${
                      sourceMetrics.balancedPerspectives ||
                      nodeData.sourceMetrics?.balancedPerspectives
                        ? "alert-success"
                        : "alert-warning"
                    }`}
                  >
                    {sourceMetrics.balancedPerspectives ||
                    nodeData.sourceMetrics?.balancedPerspectives ? (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span>Balanced Perspectives Detected</span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="stroke-current shrink-0 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
                          />
                        </svg>
                        <span>Limited Perspective Range</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Research Quality */}
        {(researchQuality || nodeData.researchQuality) && (
          <div className="card info-card shadow-xl">
            <div className="card-body">
              <h2 className="card-cust-title card-title text-2xl">
                Research Quality
              </h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-base-content/70">
                    Overall Quality Score
                  </p>
                  <p className="text-4xl text-primary">
                    {(
                      (researchQuality.qualityScore ||
                        nodeData.researchQuality?.qualityScore ||
                        0.5) * 100
                    ).toFixed(0)}
                    %
                  </p>
                  <div
                    className={getQualityBadge(
                      researchQuality.rating || nodeData.researchQuality?.rating
                    )}
                  >
                    {(
                      researchQuality.rating ||
                      nodeData.researchQuality?.rating ||
                      "MEDIUM"
                    ).toUpperCase()}{" "}
                    QUALITY
                  </div>
                </div>
              </div>

              {(researchQuality.factors || nodeData.researchQuality?.factors) &&
                (researchQuality.factors || nodeData.researchQuality?.factors)!
                  .length > 0 && (
                  <div>
                    <h3 className="text-lg mb-3">Quality Factors</h3>
                    <div className="space-y-2">
                      {(researchQuality.factors ||
                        nodeData.researchQuality?.factors)!.map(
                        (factor, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="badge badge-sm badge-primary">
                              +
                            </div>
                            <span className="text-base-content/80">
                              <ReactMarkdown>{factor}</ReactMarkdown>
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
