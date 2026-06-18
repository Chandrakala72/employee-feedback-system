import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/AdminPage";
import Feedback from "./pages/FeedbackForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Admin />} />
        <Route
          path="/feedback/:employeeName"
          element={<Feedback />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;