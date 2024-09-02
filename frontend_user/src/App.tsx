import React from "react";
import "./index.css";

import { UserProvider } from "./contexts";
import { AppRouter } from "./AppRouter";

function App() {
  return (
    <UserProvider>
      <AppRouter />
    </UserProvider>
  );
}

export default App;
