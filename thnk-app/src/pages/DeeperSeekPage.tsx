import { useNavigate, useLocation } from "react-router-dom";
import MindMapContainer from "../components/MindMapContainer";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";

export default function DeeperSeekPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  // Extract nodes (deeper level), label, and fill color from navigation state
  const nodes = state?.nodes || [];
  const parentLabel = state?.parentLabel || "Deeper Seek";
  const fill = state?.fill || "";

  const handleRedirect = () => {
    navigate(-1); // Go back to previous history page
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-between gap-2">
        <CustomBtn
          size="auto"
          type="button"
          text="go back"
          onClick={handleRedirect}
        />
        <div className="flex justify-center text-center">
          <h2>{parentLabel}</h2>
        </div>
      </div>
      {/* Render MindMapContainer with the deeper node data and inherited fill color */}
      <MindMapContainer
        initialNodes={nodes}
        parentLabel={parentLabel}
        parentFill={fill}
        width={900}
        height={500}
        // promptOrUrl intentionally empty since data is passed directly
        promptOrUrl=""
        key={parentLabel} // force remount if parentLabel changes
      />
    </div>
  );
}
