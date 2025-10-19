import React from "react";
import Navbar from "../components/Navbar";
import CustomBtn from "../components/CustomBtn";
import Searchbar from "../components/Searchbar";
import AuthForm from "../components/AuthForm";

function LandingPage() {
  return (
    <div>
      <Navbar />
      <CustomBtn type="button" size="large" text="Button button" />
      <Searchbar />
      <AuthForm />
    </div>
  );
}

export default LandingPage;
