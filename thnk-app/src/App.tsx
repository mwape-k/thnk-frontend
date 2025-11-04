import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserAuthPage from "./pages/UserAuthPage";
import UserHistoryPage from "./pages/UserHistoryPage";
import ResultsPage from "./pages/ResultsPage";
import DeeperSeekPage from "./pages/BiasAnalysisPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/*for vercel rewrites*/}
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        {/*for vercel rewrites*/}

        <Route path="/User-auth" element={<UserAuthPage />} />
        <Route path="/User-history" element={<UserHistoryPage />} />
        <Route path="/Search-results" element={<ResultsPage />} />
        <Route path="/Deeper-analysis" element={<DeeperSeekPage />} />

        {/*catch all for vercel*/}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
