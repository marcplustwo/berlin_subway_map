import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import { Bar } from "./common/Bar/Bar";
import { MapPage } from "./MapPage/MapPage";

const App: React.FC = () => (
  <Router>
    <Bar />
    <Routes>
      <Route path="/" element={<MapPage />} />
    </Routes>
  </Router>
);

export default App;
