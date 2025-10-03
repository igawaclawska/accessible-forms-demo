import { Routes, Route } from "react-router-dom";
import EnhancedAccessibilityPage from "../pages/EnhancedAccessibilityPage";
import PoorAccessibilityPage from "../pages/PoorAccessibilityPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnhancedAccessibilityPage />} />
      <Route path="/poor-accessibility" element={<PoorAccessibilityPage />} />
    </Routes>
  );
}

export default App;
