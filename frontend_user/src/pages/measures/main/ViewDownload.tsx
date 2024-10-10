import React from "react";
import { getTokenAuth } from "../../../contexts/user/use-token-management";

interface DownloadCSVLinkProps {
  measureKey: string;
  className?: string;
}

export const DownloadCSVLink: React.FC<DownloadCSVLinkProps> = ({ measureKey, className }) => {
  const handleDownload = async () => {
    const token = getTokenAuth();
    const url = `/api/user/all-key/${measureKey}/csv`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${measureKey}_data.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  return (
    <button onClick={handleDownload} className={className}>
      Download CSV
    </button>
  );
};
