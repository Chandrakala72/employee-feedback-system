import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackUrlGenerator from "./pages/FeedbackUrlGenerator";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Feedback URL Generator Screen */}
        <Route path="/" element={<FeedbackUrlGenerator />} />
        {/* Feedback Form */}
        <Route path="/feedback/:linkId" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
