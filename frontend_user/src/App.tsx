import React from "react";
import "./index.css";

import { UserProvider, AuthAwareDataProvider } from "./contexts";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <UserProvider>
      <AuthAwareDataProvider>
        <AppRouter />
      </AuthAwareDataProvider>
    </UserProvider>
  );
}

export default App;
