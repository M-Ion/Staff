import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CssBaseline from "@mui/material/CssBaseline";
import SignUpPage from "./pages/SignUp";
import Feedback from "./components/feedback";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Feedback />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
