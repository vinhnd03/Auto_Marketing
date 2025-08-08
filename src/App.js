import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CampaignManager from "./pages/CampaignManager";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import React, { useState, useEffect } from "react";

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
          <Route path="/campaignManager" element={<CampaignManager />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
