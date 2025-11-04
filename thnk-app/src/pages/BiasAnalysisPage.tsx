import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";
import "../styles/page-seek-deeper.css";
import type {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";

export default function BiasAnalysisPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Extract enhanced data from navigation state
  const nodeData = state?.nodeData || {};
  const biasAnalysis = state?.biasAnalysis || {};
  const sourceMetrics = state?.sourceMetrics || {};
  const researchQuality = state?.researchQuality || {};
  const quickAssessment = state?.quickAssessment || {};

  const handleRedirect = () => {
    navigate(-1);
  };

  const handleOpenURL = () => {
    if (nodeData?.url) {
      window.open(nodeData.url, "_blank", "noopener,noreferrer");
    }
  };

  // DaisyUI badge classes
  const getQualityBadge = (rating: string) => {
    switch (rating) {
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

  const getNeutralityBadge = (neutrality: string) => {
    switch (neutrality) {
      case "high":
        return "badge badge-success badge-lg";
      case "moderate":
        return "badge badge-warning badge-lg";
      case "low":
        return "badge badge-error badge-lg";
      default:
        return "badge badge-ghost badge-lg";
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
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

        {/* Quick Assessment Summary */}
        {quickAssessment && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl">Quick Assessment</h2>

              <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
                <div className="stat place-items-center">
                  <div className="stat-title">Overall Neutrality</div>
                  <div
                    className={getNeutralityBadge(
                      quickAssessment.overallNeutrality
                    )}
                  >
                    {quickAssessment.overallNeutrality?.toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Perspective Balance</div>
                  <div
                    className={`badge badge-lg ${
                      quickAssessment.perspectiveBalance === "balanced"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {quickAssessment.perspectiveBalance?.toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Research Quality</div>
                  <div
                    className={getQualityBadge(quickAssessment.researchQuality)}
                  >
                    {quickAssessment.researchQuality?.toUpperCase()}
                  </div>
                </div>

                <div className="stat place-items-center">
                  <div className="stat-title">Neutrality Score</div>
                  <div className="stat-value text-primary">
                    {nodeData.neutralityScore?.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="alert alert-info mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{quickAssessment.keyConsideration}</span>
              </div>
            </div>
          </div>
        )}

        {/* Bias Analysis Section */}
        {biasAnalysis && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl">Bias Analysis</h2>

              <div className="space-y-6">
                {/* Overall Assessment */}
                <div>
                  <h3 className="text-lg mb-3">Overall Assessment</h3>
                  <p className="text-base-content/80 leading-relaxed">
                    {biasAnalysis.overallAssessment}
                  </p>
                </div>

                {/* Key Findings */}
                {biasAnalysis.keyFindings &&
                  biasAnalysis.keyFindings.length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">Key Findings</h3>
                      <ul className="space-y-2">
                        {biasAnalysis.keyFindings.map(
                          (
                            finding:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            index: Key | null | undefined
                          ) => (
                            <li key={index} className="flex items-start gap-2">
                              <div className="badge badge-primary badge-sm mt-1">
                                ✓
                              </div>
                              <span className="text-base-content/80">
                                {finding}
                              </span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                {/* Critical Thinking Questions */}
                {biasAnalysis.criticalThinkingQuestions &&
                  biasAnalysis.criticalThinkingQuestions.length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">
                        Critical Thinking Questions
                      </h3>
                      <div className="space-y-3">
                        {biasAnalysis.criticalThinkingQuestions.map(
                          (
                            question:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            index: Key | null | undefined
                          ) => (
                            <div key={index} className="alert alert-warning">
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
                              <span>{question}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Research Suggestions */}
                {biasAnalysis.researchSuggestions &&
                  biasAnalysis.researchSuggestions.length > 0 && (
                    <div>
                      <h3 className="text-lg mb-3">Research Suggestions</h3>
                      <div className="space-y-2">
                        {biasAnalysis.researchSuggestions.map(
                          (
                            suggestion:
                              | string
                              | number
                              | bigint
                              | boolean
                              | ReactElement<
                                  unknown,
                                  string | JSXElementConstructor<any>
                                >
                              | Iterable<ReactNode>
                              | ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | ReactPortal
                                  | ReactElement<
                                      unknown,
                                      string | JSXElementConstructor<any>
                                    >
                                  | Iterable<ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined,
                            index: Key | null | undefined
                          ) => (
                            <div key={index} className="flex items-start gap-2">
                              <div className="badge badge-accent badge-sm mt-1">
                                💡
                              </div>
                              <span className="text-base-content/80">
                                {suggestion}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Source Metrics */}
        {sourceMetrics && (
          <div className="card info-card shadow-xl mb-6">
            <div className="card-body">
              <h2 className="card-title text-2xl">Source Analysis</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg">Neutrality Metrics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average:</span>
                      <span className="font-semibold text-primary">
                        {sourceMetrics.neutralityRange?.average?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Range:</span>
                      <span className="font-semibold">
                        {sourceMetrics.neutralityRange?.min?.toFixed(2)} -{" "}
                        {sourceMetrics.neutralityRange?.max?.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Diversity Score:</span>
                      <span className="font-semibold text-secondary">
                        {(sourceMetrics.diversityScore * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg">Perspective Analysis</h3>
                  <div
                    className={`alert ${
                      sourceMetrics.balancedPerspectives
                        ? "alert-success"
                        : "alert-warning"
                    }`}
                  >
                    {sourceMetrics.balancedPerspectives ? (
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
        {researchQuality && (
          <div className="card info-card shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl">Research Quality</h2>

              <div className="flex items-center gap-6 mb-6">
                <div className="flex-1">
                  <p className="text-sm text-base-content/70">
                    Overall Quality Score
                  </p>
                  <p className="text-4xl text-primary">
                    {(researchQuality.qualityScore * 100).toFixed(0)}%
                  </p>
                  <div className={getQualityBadge(researchQuality.rating)}>
                    {researchQuality.rating?.toUpperCase()} QUALITY
                  </div>
                </div>
              </div>

              {researchQuality.factors &&
                researchQuality.factors.length > 0 && (
                  <div>
                    <h3 className="text-lg mb-3">Quality Factors</h3>
                    <div className="space-y-2">
                      {researchQuality.factors.map(
                        (
                          factor:
                            | string
                            | number
                            | bigint
                            | boolean
                            | ReactElement<
                                unknown,
                                string | JSXElementConstructor<any>
                              >
                            | Iterable<ReactNode>
                            | ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | ReactPortal
                                | ReactElement<
                                    unknown,
                                    string | JSXElementConstructor<any>
                                  >
                                | Iterable<ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined,
                          index: Key | null | undefined
                        ) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="badge badge-sm badge-primary">
                              +
                            </div>
                            <span className="text-base-content/80">
                              {factor}
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
