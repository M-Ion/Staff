import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
