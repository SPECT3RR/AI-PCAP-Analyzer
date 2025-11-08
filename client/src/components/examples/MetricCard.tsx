import { Activity, Users, Shield, AlertTriangle } from "lucide-react";
import MetricCard from "../MetricCard";

export default function MetricCardExample() {
  return (
    <div className="p-8 bg-background grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        icon={Activity}
        label="Total Packets"
        value="45,231"
        trend={{ value: 12, isPositive: true }}
      />
      <MetricCard
        icon={Users}
        label="Unique IPs"
        value="127"
        trend={{ value: 8, isPositive: false }}
      />
      <MetricCard
        icon={Shield}
        label="Malicious %"
        value="8.3%"
        gradient="from-threat-malicious/20 to-threat-suspicious/20"
      />
      <MetricCard
        icon={AlertTriangle}
        label="Attack Type"
        value="DDoS"
        gradient="from-neon-purple/20 to-accent/20"
      />
    </div>
  );
}
