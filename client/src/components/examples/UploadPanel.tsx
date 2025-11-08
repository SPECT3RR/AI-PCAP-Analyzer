import { useState } from "react";
import UploadPanel from "../UploadPanel";

export default function UploadPanelExample() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  return (
    <UploadPanel 
      onFileSelect={handleFileSelect}
      isAnalyzing={isAnalyzing}
    />
  );
}
