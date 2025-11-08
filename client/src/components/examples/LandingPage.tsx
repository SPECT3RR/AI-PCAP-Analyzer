import LandingPage from "../../pages/LandingPage";

export default function LandingPageExample() {
  return (
    <LandingPage 
      onStartAnalysis={() => console.log("Start analysis clicked")} 
    />
  );
}
