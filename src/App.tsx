import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import { Bar } from "./common/Bar/Bar";
import { MapPage } from "./MapPage/MapPage";

const App: React.FC = () => (
  <Router>
    <Bar />
    <Routes>
      <Route path="/" element={<Navigate replace to="/map" />} />
      <Route path="/map" element={<MapPage />} />
    </Routes>
  </Router>
);

export default App;
