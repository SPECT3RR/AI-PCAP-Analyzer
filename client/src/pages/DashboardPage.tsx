import { motion } from "framer-motion";
import { Download, Upload as UploadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/MetricCard";
import ChartsPanel from "@/components/ChartsPanel";
import MapView from "@/components/MapView";
import IOCTable from "@/components/IOCTable";
import { Activity, Users, Shield, AlertTriangle } from "lucide-react";

interface DashboardData {
  summary: {
    packets: number;
    unique_ips: number;
    prediction: string;
    malicious_percent: number;
    confidence: number;
  };
  geo: Array<{
    ip: string;
    country: string;
    lat: number;
    lon: number;
  }>;
  iocs: Array<{
    id: string;
    type: "IP" | "Domain" | "Hash";
    value: string;
    threatScore: number;
    firstSeen: string;
    count: number;
  }>;
}

interface DashboardPageProps {
  data: DashboardData;
  onNewUpload: () => void;
  onGenerateReport: () => void;
}

export default function DashboardPage({ data, onNewUpload, onGenerateReport }: DashboardPageProps) {
  const mapMarkers = data.geo.map((item, idx) => ({
    ...item,
    threatScore: data.iocs[idx % data.iocs.length]?.threatScore || 50,
  }));

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="sticky top-0 z-50 glass border-b border-border/50 backdrop-blur-lg"
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold neon-text-cyan">AI-PCAP Analyzer</h1>
            <p className="text-sm text-muted-foreground">Analysis Results</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onGenerateReport}
              variant="outline"
              className="gap-2"
              data-testid="button-generate-report"
            >
              <Download className="w-4 h-4" />
              Generate Report
            </Button>
            <Button
              onClick={onNewUpload}
              className="bg-gradient-to-r from-neon-cyan to-primary gap-2"
              data-testid="button-new-upload"
            >
              <UploadIcon className="w-4 h-4" />
              New Upload
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              icon={Activity}
              label="Total Packets"
              value={data.summary.packets.toLocaleString()}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              icon={Users}
              label="Unique IPs"
              value={data.summary.unique_ips}
            />
            <MetricCard
              icon={Shield}
              label="Malicious %"
              value={`${data.summary.malicious_percent.toFixed(1)}%`}
              gradient="from-threat-malicious/20 to-threat-suspicious/20"
            />
            <MetricCard
              icon={AlertTriangle}
              label="Predicted Attack"
              value={data.summary.prediction}
              gradient="from-neon-purple/20 to-accent/20"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ChartsPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <MapView markers={mapMarkers} />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <IOCTable iocs={data.iocs} />
        </motion.div>
      </div>
    </div>
  );
}
