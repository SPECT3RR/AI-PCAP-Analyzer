import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "@/pages/LandingPage";
import UploadPanel from "@/components/UploadPanel";
import DashboardPage from "@/pages/DashboardPage";

type AppState = "landing" | "upload" | "dashboard";

function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);

  const handleStartAnalysis = () => {
    setAppState("upload");
  };

  const handleFileSelect = async (file: File) => {
    setIsAnalyzing(true);
    console.log("Analyzing file:", file.name);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to analyze PCAP file');
      }
      
      const data = await response.json();
      setDashboardData(data);
      setIsAnalyzing(false);
      setAppState("dashboard");
    } catch (error) {
      console.error("Error analyzing file:", error);
      setIsAnalyzing(false);
      alert("Failed to analyze PCAP file. Please try again.");
    }
  };

  const handleNewUpload = () => {
    setAppState("upload");
    setDashboardData(null);
  };

  const handleGenerateReport = async () => {
    if (!dashboardData?.id) return;
    
    try {
      const response = await fetch(`/api/report/${dashboardData.id}`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate report');
      }
      
      const result = await response.json();
      alert(`Report generation initiated: ${result.filename}\n\nNote: ${result.message}`);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {appState === "landing" && (
          <LandingPage onStartAnalysis={handleStartAnalysis} />
        )}
        
        {appState === "upload" && (
          <UploadPanel 
            onFileSelect={handleFileSelect}
            isAnalyzing={isAnalyzing}
          />
        )}
        
        {appState === "dashboard" && dashboardData && (
          <DashboardPage
            data={dashboardData}
            onNewUpload={handleNewUpload}
            onGenerateReport={handleGenerateReport}
          />
        )}
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
