import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackUrlGenerator from "./pages/FeedbackUrlGenerator";
import FeedbackDashboard from "./pages/FeedbackDashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Feedback Dashboard */}
        <Route path="/" element={
          <ProtectedRoute><FeedbackDashboard /></ProtectedRoute>
        } />
        {/* Feedback URL Generator Screen */}
        <Route path="/feedback-urls" element={
          <ProtectedRoute><FeedbackUrlGenerator /></ProtectedRoute>
        } />
        {/* Feedback Form - No Auth*/}
        <Route path="/feedback/:linkId" element={<FeedbackForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
