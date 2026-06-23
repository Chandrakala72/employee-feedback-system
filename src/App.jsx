import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/AdminPage";
import FeedbackForm from "./pages/FeedbackForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Page */}
        <Route path="/" element={<Admin />} />
        {/* Feedback Form */}
        <Route path="/feedback/:employeeName" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
