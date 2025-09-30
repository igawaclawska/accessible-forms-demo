import { HashRouter as Router, Routes, Route } from "react-router-dom";
import EnhancedAccessibilityPage from "./pages/EnhancedAccessibilityPage";
import PoorAccessibilityPage from "./pages/PoorAccessibilityPage";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EnhancedAccessibilityPage />} />
        <Route path="/poor-accessibility" element={<PoorAccessibilityPage />} />
      </Routes>
    </Router>
  );
}

export default App;
