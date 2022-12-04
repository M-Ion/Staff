/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import CssBaseline from "@mui/material/CssBaseline";
import SignUpPage from "./pages/SignUp";
import Feedback from "./components/feedback";
import { useEffect } from "react";
import authService from "./services/auth.service";
import { useDispatch } from "react-redux";
import { setToken } from "./services/store/slices/user.slice";

function App() {
  const dispatch = useDispatch();

  const [fetchToken] = authService.useFetchTokenMutation();
  const [fetchSession] = authService.useFetchSessionMutation();

  const checkCurrentUser = async () => {
    const { token } = await fetchToken().unwrap();

    if (token) {
      dispatch(setToken(token));
      await fetchSession();
    }
  };

  useEffect(() => {
    checkCurrentUser();
  }, []);

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
