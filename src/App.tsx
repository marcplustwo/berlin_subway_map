import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { Bar } from "./common/Bar/Bar";
import { LandingPage } from "./LandingPage/LandingPage";
import { MapPage } from "./MapPage/MapPage";

const App: React.FC = () => (
  <Router>
    <Bar />
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  </Router>
);

export default App;
