import { useLocation, useNavigate } from "react-router-dom";
import SummmaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MindMapContainer from "../components/MindMapContainer";
import { useState, useEffect } from "react";
import CustomBtn from "../components/CustomBtn";
import {
  normalizeSearchData,
  type EnhancedSearchResponse,
  type UrlSearchResponse,
} from "../services/searchService";

import "../styles/page-results.css";

// Define a normalized interface that works for both prompt and URL responses
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
  mainContent?: any; // For URL responses
}

//this page handles results from searchbar

function ResultsPage() {
  const location = useLocation();
  const [searchData, setSearchData] = useState<NormalizedSearchData | null>(
    null
  );
  const [searchType, setSearchType] = useState<"url" | "prompt">("prompt");

  const navigate = useNavigate();

  // Get initial data from navigation state
  useEffect(() => {
    if (location.state?.searchData) {
      console.log("Location state data:", location.state.searchData);

      // Normalize the data from location state
      const normalizedData = normalizeSearchData(location.state.searchData);
      console.log("Normalized location state data:", normalizedData);

      if (normalizedData) {
        setSearchData(normalizedData);
        setSearchType(location.state.searchType || "prompt");
      }
    }
  }, [location.state]);

  const handleSearchComplete = (
    data: EnhancedSearchResponse | UrlSearchResponse,
    type: "prompt" | "url"
  ) => {
    console.log("Raw search completed:", data);

    // Normalize the data for consistent handling
    const normalizedData = normalizeSearchData(data);
    console.log("Normalized search data:", normalizedData);

    if (normalizedData) {
      console.log("Summary:", normalizedData.summary);
      console.log("Neutrality Score:", normalizedData.neutralityScore);
      console.log("Persuasion Score:", normalizedData.persuasionScore);
      console.log("Sources count:", normalizedData.sources.length);

      // Enhanced bias analysis data
      if (normalizedData.biasAnalysis) {
        console.log(
          "Bias Analysis:",
          normalizedData.biasAnalysis.overallAssessment ||
            normalizedData.biasAnalysis
        );
        console.log(
          "Critical Questions:",
          normalizedData.biasAnalysis.criticalThinkingQuestions
        );
      }

      if (normalizedData.sourceMetrics) {
        console.log(
          "Source Metrics:",
          normalizedData.sourceMetrics.neutralityRange
        );
      }

      if (normalizedData.quickAssessment) {
        console.log(
          "Quick Assessment:",
          normalizedData.quickAssessment.keyConsideration
        );
      }

      setSearchData(normalizedData);
      setSearchType(type);
    } else {
      console.error("Failed to normalize search data");
    }
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
