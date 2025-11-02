import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

function LandingPage() {
  const navigate = useNavigate();

  const handleSearchComplete = (data: any, searchType: "prompt" | "url") => {
    console.log("Search completed:", data);

    if (searchType === "url") {
      console.log("Main content:", data.main);
      console.log("AI Summary:", data.aiSummary);
      console.log("Related sources:", data.relatedSources);
    } else {
      console.log("Summary:", data.summary);
      console.log("Sources:", data.sources);
    }

    // Navigate to ResultsPage with search data
    navigate("/Search-results", {
      state: {
        searchData: data,
        searchType: searchType,
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl font-bold mt-16">Welcome to THNK</h1>
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
