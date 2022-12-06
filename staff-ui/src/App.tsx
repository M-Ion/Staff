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
import {
  setState as setUserState,
  setToken,
} from "./services/store/slices/user.slice";
import ManagerPanelPage from "./pages/ManagerPanel";
import WorkersPage from "./pages/Workers";
import CategoriesPage from "./pages/Categories";
import DishesPage from "./pages/Dishes";

function App() {
  const dispatch = useDispatch();

  const [fetchToken] = authService.useFetchTokenMutation();
  const [fetchSession] = authService.useFetchSessionMutation();

  const checkCurrentUser = async () => {
    const { token } = await fetchToken().unwrap();

    if (token) {
      dispatch(setToken(token));

      const { user } = await fetchSession().unwrap();
      dispatch(setUserState({ currentUser: user, token }));
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
        <Route path="/manager/*" element={<ManagerPanelPage />}>
          <Route
            path=""
            element={<Navigate to={"/manager/statistics"} replace />}
          />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="menu" element={<DishesPage />} />
          <Route
            path="statistics"
            element={<div className="stats">Statistics</div>}
          />
          <Route path="workers" element={<WorkersPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to={"/login"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
