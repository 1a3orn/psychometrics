import React from "react";

import { NAVBAR_HEIGHT } from "./navbar/Navbar";

interface FullScreenProps {
  children: React.ReactNode;
}

export const FullScreen: React.FC<FullScreenProps> = ({ children }) => {
  return (
    <div style={{ height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, width: "100vw" }}>
      {children}
    </div>
  );
};
