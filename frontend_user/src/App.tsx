import React from "react";
import "./index.css";

import { UserProvider } from "./contexts";
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

function App() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
}

export default App;
