import DashboardPage from "../../pages/DashboardPage";

export default function DashboardPageExample() {
  const mockData = {
    summary: {
      packets: 45231,
      unique_ips: 127,
      prediction: "DDoS Attack",
      malicious_percent: 8.3,
      confidence: 92.5,
    },
    geo: [
      { ip: "192.168.1.100", country: "United States", lat: 37.7749, lon: -122.4194 },
      { ip: "10.0.0.45", country: "Russia", lat: 55.7558, lon: 37.6173 },
      { ip: "172.16.0.23", country: "China", lat: 39.9042, lon: 116.4074 },
      { ip: "192.168.2.50", country: "Germany", lat: 52.5200, lon: 13.4050 },
      { ip: "10.1.1.100", country: "Japan", lat: 35.6762, lon: 139.6503 },
    ],
    iocs: [
      { id: "1", type: "IP" as const, value: "192.168.1.100", threatScore: 85, firstSeen: "2025-01-08 14:23", count: 234 },
      { id: "2", type: "IP" as const, value: "10.0.0.45", threatScore: 72, firstSeen: "2025-01-08 14:25", count: 156 },
      { id: "3", type: "Domain" as const, value: "malicious-site.com", threatScore: 95, firstSeen: "2025-01-08 14:30", count: 89 },
      { id: "4", type: "IP" as const, value: "172.16.0.23", threatScore: 45, firstSeen: "2025-01-08 14:32", count: 67 },
      { id: "5", type: "Hash" as const, value: "a3f5b2c1d4e6f7a8b9c0d1e2f3a4b5c6", threatScore: 28, firstSeen: "2025-01-08 14:35", count: 12 },
      { id: "6", type: "IP" as const, value: "192.168.2.50", threatScore: 15, firstSeen: "2025-01-08 14:40", count: 45 },
    ],
  };

  return (
    <DashboardPage
      data={mockData}
      onNewUpload={() => console.log("New upload clicked")}
      onGenerateReport={() => console.log("Generate report clicked")}
    />
  );
}
