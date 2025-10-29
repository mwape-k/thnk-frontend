import React from "react";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";
import Searchbar from "../components/Searchbar";
import AuthForm from "../components/AuthForm";
import HistoryCard from "../components/HistoryCard";
import PopoverCard from "../components/PopoverCard";
import SummmaryCard from "../components/SummaryCard";
import NodeMap from "../components/NodeMap";
import MindMapContainer from "../components/MindMapContainer";

function LandingPage() {
  // Define a default value for userPromptOrUrl
  const userPromptOrUrl = "a prompt";

  return (
    <div>
      <Navbar />
      <div className="flex grid-cols-1 m-12">
        <MindMapContainer promptOrUrl={userPromptOrUrl} />
      </div>
    </div>
  );
}

export default LandingPage;
