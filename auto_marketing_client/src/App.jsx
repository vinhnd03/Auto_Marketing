import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";

// Import components and pages using new structure
import { Navbar, Footer, Preloader } from "./components";

import {
  Home,
  CampaignManager,
  Profile,
  Settings,
  WorkspacePage,
  WorkspaceDetailPage,
} from "./pages";

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1200);
  }, []);
  if (loading) return <Preloader />;
  return (
    <Router>
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign-manager" element={<CampaignManager />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/workspace" element={<WorkspacePage />} />
          <Route
            path="/workspace/:workspaceId"
            element={<WorkspaceDetailPage />}
          />
          <Route
            path="/dashboard/workspaces/:workspaceId"
            element={<WorkspaceDetailPage />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
