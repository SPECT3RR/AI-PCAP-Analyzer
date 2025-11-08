import IOCTable from "../IOCTable";

export default function IOCTableExample() {
  const mockIOCs = [
    { id: "1", type: "IP" as const, value: "192.168.1.100", threatScore: 85, firstSeen: "2025-01-08 14:23", count: 234 },
    { id: "2", type: "IP" as const, value: "10.0.0.45", threatScore: 72, firstSeen: "2025-01-08 14:25", count: 156 },
    { id: "3", type: "Domain" as const, value: "malicious-site.com", threatScore: 95, firstSeen: "2025-01-08 14:30", count: 89 },
    { id: "4", type: "IP" as const, value: "172.16.0.23", threatScore: 45, firstSeen: "2025-01-08 14:32", count: 67 },
    { id: "5", type: "Hash" as const, value: "a3f5b2c1d4e6f7a8b9c0d1e2f3a4b5c6", threatScore: 28, firstSeen: "2025-01-08 14:35", count: 12 },
    { id: "6", type: "IP" as const, value: "192.168.2.50", threatScore: 15, firstSeen: "2025-01-08 14:40", count: 45 },
  ];

  return (
    <div className="p-8 bg-background">
      <IOCTable iocs={mockIOCs} />
    </div>
  );
}
