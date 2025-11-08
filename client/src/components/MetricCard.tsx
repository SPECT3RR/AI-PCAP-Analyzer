import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  gradient?: string;
}

export default function MetricCard({ icon: Icon, label, value, trend, gradient = "from-primary/20 to-accent/20" }: MetricCardProps) {
  return (
    <Card className="glass glass-hover p-6 border-card-border" data-testid={`card-metric-${label.toLowerCase().replace(/\s+/g, '-')}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {trend && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              trend.isPositive ? 'bg-threat-benign/20 text-threat-benign' : 'bg-threat-malicious/20 text-threat-malicious'
            }`}
          >
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        <p className="text-3xl font-bold text-foreground" data-testid={`text-value-${label.toLowerCase().replace(/\s+/g, '-')}`}>
          {value}
        </p>
      </motion.div>
    </Card>
  );
}
