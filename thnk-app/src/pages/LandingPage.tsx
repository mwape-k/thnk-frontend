import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import type { EnhancedSearchResponse } from "@/services/searchService";

import "../styles/page-landing.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleSearchComplete = (
    data: EnhancedSearchResponse,
    searchType: "prompt" | "url"
  ) => {
    console.log("Search completed:", data);
    console.log("Search type:", searchType);

    // Now both search types return the same enhanced structure
    console.log("Summary:", data.summary);
    console.log("Neutrality Score:", data.neutralityScore);
    console.log("Persuasion Score:", data.persuasionScore);
    console.log("Sources count:", data.sources?.length);

    // Enhanced bias analysis data
    if (data.biasAnalysis) {
      console.log("Bias Analysis:", data.biasAnalysis.overallAssessment);
      console.log(
        "Critical Questions:",
        data.biasAnalysis.criticalThinkingQuestions
      );
    }

    if (data.sourceMetrics) {
      console.log("Source Metrics:", data.sourceMetrics.neutralityRange);
    }

    if (data.quickAssessment) {
      console.log("Quick Assessment:", data.quickAssessment.keyConsideration);
    }

    // Navigate to ResultsPage with enhanced search data
    navigate("/Search-results", {
      state: {
        searchData: data,
        searchType: searchType,
        // You can also pass specific enhanced data if needed
        enhancedData: {
          biasAnalysis: data.biasAnalysis,
          sourceMetrics: data.sourceMetrics,
          researchQuality: data.researchQuality,
          quickAssessment: data.quickAssessment,
        },
      },
    });
  };

  const handleSearchError = (error: string) => {
    console.error("Search error:", error);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-between px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 title-card mt-16">
          <h1 className="text-4xl font-bold">Welcome to THNK</h1>
          <p className="pt-3 text-gray-300">
            THNK is an interactive research tool that helps you find sources or
            understand topics in a neutral and unbiased way
          </p>
        </div>

        {/* Searchbar positioned lower but still centered */}
        <div className="w-full max-w-4xl mx-auto mb-16">
          <Searchbar
            onSearchComplete={handleSearchComplete}
            onSearchError={handleSearchError}
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
