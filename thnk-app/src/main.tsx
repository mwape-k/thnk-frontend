import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div data-theme="thnk" className="app-container">
      <App />
    </div>
  </StrictMode>
);
