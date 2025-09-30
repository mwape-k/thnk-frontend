import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import UserAuthPage from "./pages/UserAuthPage";
import UserHistoryPage from "./pages/UserHistoryPage";
import ResultsPage from "./pages/ResultsPage";
import DeeperSeekPage from "./pages/DeeperSeekPage";

function App() {
  return;
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/User-auth" element={<UserAuthPage />} />
      <Route path="/User-history" element={<UserHistoryPage />} />
      <Route path="/Search-results" element={<ResultsPage />} />
      <Route path="/Search-deeper" element={<DeeperSeekPage />} />
    </Routes>
  </Router>;
}

export default App;
