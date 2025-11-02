import { useLocation, useNavigate } from "react-router-dom";
import SummmaryCard from "../components/SummaryCard";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";
import MindMapContainer from "../components/MindMapContainer";
import { useState, useEffect } from "react";
import CustomBtn from "../components/CustomBtn";

function ResultsPage() {
  const location = useLocation();
  const [searchData, setSearchData] = useState(null);
  const [searchType, setSearchType] = useState<"url" | "prompt">("prompt");

  const navigate = useNavigate();

  // Get initial data from navigation state
  useEffect(() => {
    if (location.state?.searchData) {
      setSearchData(location.state.searchData);
      setSearchType(location.state.searchType || "prompt");
    }
  }, [location.state]);

  const handleSearchComplete = (data: any, type: "prompt" | "url") => {
    console.log("Search completed:", data);

    if (type === "url") {
      console.log("Main content:", data.main);
      console.log("AI Summary:", data.aiSummary);
      console.log("Related sources:", data.relatedSources);
    } else {
      console.log("Summary:", data.summary);
      console.log("Sources:", data.sources);
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
      <div className="flex justify-between gap-2">
        <CustomBtn
          size="auto"
          type="button"
          text="go back"
          onClick={handleRedirect}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-between px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <MindMapContainer
            responseData={searchData}
            searchType={searchType}
            width={1000}
            height={600}
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
