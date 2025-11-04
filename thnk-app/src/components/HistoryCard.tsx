import "../components/component-styles/styles-historyCard.css";
import Node from "../assets/node.svg";
import { Eye, Trash } from "lucide-react";
import type { SearchHistory } from "../interface/history";
//import { useNavigate } from "react-router-dom";

interface HistoryCardProps {
  history: SearchHistory;
  onView: (historyId: string, historyData: SearchHistory) => void; // Updated to pass history data
  onDelete: (historyId: string) => void;
  isLoading?: boolean;
}

function HistoryCard({
  history,
  onView,
  onDelete,
  isLoading = false,
}: HistoryCardProps) {
  const { _id, query, timestamp, resultSummary } = history;
  //const navigate = useNavigate();

  // Format date
  const formattedDate = new Date(timestamp).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleViewClick = () => {
    onView(_id, history); // Pass both ID and full history data
  };

  if (isLoading) {
    return (
      <div className="history-outer flex grid-cols-3 gap-4 p-0 justify-center items-center w-full animate-pulse">
        <div className="node-cont">
          <div className="node-history bg-gray-300 rounded-full w-12 h-12"></div>
        </div>
        <div className="history-card col-span-8 p-6 flex-1">
          <div className="history-card-cont flex grid-cols-2 gap-4">
            <div className="col-span-4">
              <div className="history-score h-4 bg-gray-300 rounded mb-2"></div>
              <div className="history-score h-4 bg-gray-300 rounded"></div>
            </div>
            <div className="col-span-8">
              <div className="node-summary h-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        <div className="actions col-span-2 p-2">
          <div className="flex grid-cols-2 gap-2">
            <div className="col">
              <button className="btn-secondary opacity-50" disabled>
                <Trash />
              </button>
            </div>
            <div className="col">
              <button className="btn-secondary opacity-50" disabled>
                <Eye />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="history-outer flex grid-cols-3 gap-4 p-0 justify-center items-center w-full">
      <div className="node-cont">
        <img src={Node} alt="Node" className="node-history" />
      </div>
      <div className="history-card col-span-8 p-6 flex-1">
        <div className="history-card-cont flex grid-cols-2 gap-4">
          <div className="col-span-4">
            <h4 className="history-score">
              Neutrality: {resultSummary?.neutralityScore?.toFixed(2) || "N/A"}
            </h4>
            <h4 className="history-score">
              Persuasion: {resultSummary?.persuasionScore?.toFixed(2) || "N/A"}
            </h4>
            <p className="text-xs text-slate-500 mt-2">{formattedDate}</p>
            <p className="text-xs text-pink-300 truncate" title={query}>
              {query}
            </p>
          </div>
          <div className="col-span-8">
            <p className="node-summary">
              {resultSummary?.summary || "No summary available"}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-600">
              <span className="badge badge-neutral text-amber-50 px-2 py-1 rounded text-xs font-bold">
                {resultSummary?.sourcesCount || 0} sources
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="actions col-span-2 p-2">
        <div className="flex grid-cols-2 gap-2">
          <div className="col">
            <button
              className="btn btn-tertiary hover:bg-red-100 hover:text-red-400 transition-colors"
              onClick={() => onDelete(_id)}
              title="Delete this search"
            >
              <Trash size={18} />
            </button>
          </div>
          <div className="col">
            <button
              className="btn btn-tertiary hover:bg-blue-100 hover:text-blue-600 transition-colors"
              onClick={handleViewClick}
              title="View full analysis"
            >
              <Eye size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryCard;
