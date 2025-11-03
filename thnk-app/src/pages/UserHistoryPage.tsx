// src/pages/UserHistoryPage.tsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import { historyService } from "../services/historyServices";
import { Trash2, RefreshCw, AlertCircle } from "lucide-react";
import type { SearchHistory } from "../interface/history";

import "../styles/page-history.css";

function UserHistoryPage() {
  const [history, setHistory] = useState<SearchHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Fetch user history
  const fetchHistory = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const historyData: SearchHistory[] = await historyService.getUserHistory(
        20
      );
      setHistory(historyData);
    } catch (err) {
      setError("Failed to load search history");
      console.error("Error fetching history:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle view full analysis
  const handleViewAnalysis = async (historyId: string): Promise<void> => {
    try {
      const fullResult = await historyService.getFullSearchResult(historyId);
      // You can show this in a modal or navigate to a details page
      console.log("Full analysis:", fullResult);
      // For now, just alert with the summary
      alert(`Full Analysis:\n\n${fullResult.summary}`);
    } catch (err) {
      alert("Failed to load full analysis");
      console.error("Error fetching full analysis:", err);
    }
  };

  // Handle delete single entry
  const handleDeleteEntry = async (historyId: string): Promise<void> => {
    if (
      !window.confirm("Are you sure you want to delete this search history?")
    ) {
      return;
    }

    try {
      setDeletingId(historyId);
      await historyService.deleteHistoryEntry(historyId);
      // Remove from local state
      setHistory((prev) => prev.filter((item) => item._id !== historyId));
    } catch (err) {
      alert("Failed to delete search history");
      console.error("Error deleting history entry:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle clear all history
  const handleClearAll = async (): Promise<void> => {
    if (
      !window.confirm(
        "Are you sure you want to clear ALL search history? This cannot be undone."
      )
    ) {
      return;
    }

    try {
      await historyService.clearAllHistory();
      setHistory([]); // Clear local state
    } catch (err) {
      alert("Failed to clear all history");
      console.error("Error clearing all history:", err);
    }
  };

  // Load history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl">Search History</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchHistory}
              disabled={loading}
              className="btn btn-secondary flex items-center gap-2"
              type="button"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                disabled={loading}
                className="btn btn-tertiary flex items-center gap-2 text-red-400 hover:bg-red-50 space-x-3"
                type="button"
              >
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <AlertCircle className="text-red-400" size={20} />
            <div>
              <p className="text-red-400 font-medium">{error}</p>
              <button
                onClick={fetchHistory}
                className="btn btn-tertiary text-red-400  text-sm mt-1"
                type="button"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && history.length === 0 ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <HistoryCard
                key={index}
                history={{} as SearchHistory} // Temporary empty object for loading
                onView={handleViewAnalysis}
                onDelete={handleDeleteEntry}
                isLoading={true}
              />
            ))}
          </div>
        ) : (
          /* History List */
          <div className="space-y-4">
            {history.length === 0 ? (
              <div className="text-center py-12 no-history">
                <div className="text-neutral-200 mb-4">
                  <RefreshCw size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-neutral-200 mb-2">
                  No search history yet
                </h3>
                <p className="text-slate-300">
                  Your search history will appear here after you analyze some
                  URLs.
                </p>
              </div>
            ) : (
              history.map((item: SearchHistory) => (
                <HistoryCard
                  key={item._id}
                  history={item}
                  onView={handleViewAnalysis}
                  onDelete={handleDeleteEntry}
                  isLoading={deletingId === item._id}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHistoryPage;
