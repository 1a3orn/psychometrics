import React from "react";
import { Navbar } from "./navbar";

interface PageProps {
  children: React.ReactNode;
}

export const PageMain: React.FC<PageProps> = ({ children }) => {
  return (
    <div
      id="page-container"
      className="mx-auto flex min-h-dvh w-full min-w-[320px] flex-col bg-gray-100 dark:bg-gray-900 dark:text-gray-100"
    >
      {children}
    </div>
  );
};

export const PageMainLoading: React.FC = () => {
  return (
    <PageMain>
      <Navbar title="Loading..." />
      <PageContent>Loading...</PageContent>
    </PageMain>
  );
};

export const PageContent: React.FC<PageProps> = ({ children }) => {
  return (
    <main id="page-content" className="flex max-w-full flex-auto flex-col">
      <div className="container mx-auto p-4 lg:p-8 xl:max-w-7xl">{children}</div>
    </main>
  );
};
