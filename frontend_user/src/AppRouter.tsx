import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  LoginPage,
  LoginSignupPage,
  UserDashbooardPage,
  UserAnalyticsPage,
  UserAccountPage,
  UserSettingsPage,
} from "./pages";

import { MeasuresRouter } from "./pages/measures";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/measures/*" element={<MeasuresRouter />} />
        <Route path="/signup" element={<LoginSignupPage />} />
        <Route path="/dashboard" element={<UserDashbooardPage />} />
        <Route path="/analytics" element={<UserAnalyticsPage />} />
        <Route path="/account" element={<UserAccountPage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
      </Routes>
    </Router>
  );
};
