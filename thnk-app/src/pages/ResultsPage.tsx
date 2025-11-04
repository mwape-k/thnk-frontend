import { useLocation, useNavigate } from "react-router-dom";
import SummmaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MindMapContainer from "../components/MindMapContainer";
import { useState, useEffect } from "react";
import CustomBtn from "../components/CustomBtn";
import type { EnhancedSearchResponse } from "../services/searchService";

import "../styles/page-results.css";

//this page handles results from searchbar

function ResultsPage() {
  const location = useLocation();
  const [searchData, setSearchData] = useState<EnhancedSearchResponse | null>(
    null
  );
  const [searchType, setSearchType] = useState<"url" | "prompt">("prompt");

  const navigate = useNavigate();

  // Get initial data from navigation state
  useEffect(() => {
    if (location.state?.searchData) {
      setSearchData(location.state.searchData);
      setSearchType(location.state.searchType || "prompt");
    }
  }, [location.state]);

  const handleSearchComplete = (
    data: EnhancedSearchResponse,
    type: "prompt" | "url"
  ) => {
    console.log("Search completed:", data);

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

    setSearchData(data);
    setSearchType(type);
  };

  const handleSearchError = (error: string) => {
    console.error("Search error:", error);
  };

  const handleRedirect = () => {
    navigate(-1); // Go back to previous history page
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex justify-between gap-2 top-bar-actions col-span-full">
        <CustomBtn
          size="auto"
          type="button"
          text="go back"
          onClick={handleRedirect}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-between px-4">
        <div className="text-center mx-auto mind-map-cont">
          <MindMapContainer
            responseData={searchData}
            searchType={searchType}
            className="actual-mind-map"
          />
        </div>

        <div className="w-full max-w-4xl mx-auto mb-16">
          <SummmaryCard searchData={searchData} searchType={searchType} />
          <Searchbar
            onSearchComplete={handleSearchComplete}
            onSearchError={handleSearchError}
          />
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;
