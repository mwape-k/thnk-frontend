import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";

import "../styles/page-seek-deeper.css";

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

  const handleOpenURL = () => {
    navigate("_blank/");
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
        <div className="node-breakdown">
          <h1 className="node-title">{/*node title*/}</h1>
          <p className="node-sumamry">{/*node summary*/}</p>
          <CustomBtn
            text="go to source"
            type="button"
            size="auto"
            onClick={handleOpenURL}
          />
        </div>
      </div>
    </div>
  );
}
