import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3 } from "lucide-react";

export default function ChartsPanel() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="glass p-6 border-card-border" data-testid="card-time-series">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Events Over Time</h3>
          </div>
          <div className="h-64 flex items-center justify-center border border-dashed border-border rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Time-series chart placeholder</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Plotly.js will render here in production</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="glass p-6 border-card-border" data-testid="card-protocol-dist">
            <div className="flex items-center gap-2 mb-4">
              <PieChart className="w-5 h-5 text-chart-2" />
              <h3 className="text-lg font-semibold text-foreground">Protocol Distribution</h3>
            </div>
            <div className="h-48 flex items-center justify-center border border-dashed border-border rounded-lg">
              <div className="text-center">
                <div className="flex gap-4 mb-3">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-chart-1/30 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">TCP 65%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 rounded-full bg-chart-2/30 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">UDP 25%</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-chart-3/30 mx-auto mb-1" />
                    <p className="text-xs text-muted-foreground">Other 10%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground/70">Donut chart placeholder</p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="glass p-6 border-card-border" data-testid="card-top-sources">
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-chart-4" />
              <h3 className="text-lg font-semibold text-foreground">Top Sources</h3>
            </div>
            <div className="space-y-3">
              {[
                { ip: "192.168.1.100", count: 1234, percent: 85 },
                { ip: "10.0.0.45", count: 856, percent: 60 },
                { ip: "172.16.0.23", count: 432, percent: 35 },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-foreground font-mono">{item.ip}</span>
                    <span className="text-muted-foreground">{item.count}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                      className="h-full bg-gradient-to-r from-chart-4 to-chart-5"
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
