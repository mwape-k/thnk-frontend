import Navbar from "../components/Navbar";
import Searchbar from "../components/Searchbar";

function LandingPage() {
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
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
