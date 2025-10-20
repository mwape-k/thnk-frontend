import React from "react";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";
import Searchbar from "../components/Searchbar";
import AuthForm from "../components/AuthForm";
import HistoryCard from "../components/HistoryCard";
import PopoverCard from "../components/PopoverCard";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <div className="flex grid-cols-1 m-12">
        <PopoverCard hasLink={true} />
      </div>
    </div>
  );
}

export default LandingPage;
