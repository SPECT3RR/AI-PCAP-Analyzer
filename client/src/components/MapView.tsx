import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";

interface MapMarker {
  ip: string;
  country: string;
  lat: number;
  lon: number;
  threatScore: number;
}

interface MapViewProps {
  markers?: MapMarker[];
}

export default function MapView({ markers = [] }: MapViewProps) {
  const getMarkerColor = (threatScore: number) => {
    if (threatScore >= 60) return "bg-threat-malicious";
    if (threatScore >= 30) return "bg-threat-suspicious";
    return "bg-threat-benign";
  };

  return (
    <Card className="glass p-6 border-card-border h-full" data-testid="card-map-view">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Geographic Distribution</h3>
      </div>
      
      <div className="relative h-96 bg-gradient-to-br from-background to-card rounded-lg border border-border overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Globe className="w-20 h-20 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-sm text-muted-foreground">Interactive world map placeholder</p>
            <p className="text-xs text-muted-foreground/70 mt-1">React-Leaflet will render here in production</p>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 glass p-3 rounded-lg space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-threat-benign" />
            <span className="text-muted-foreground">Benign (0-29)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-threat-suspicious" />
            <span className="text-muted-foreground">Suspicious (30-59)</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-threat-malicious" />
            <span className="text-muted-foreground">Malicious (60+)</span>
          </div>
        </div>

        {markers.length > 0 && (
          <div className="absolute top-4 left-4 glass p-4 rounded-lg max-w-xs">
            <p className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Active Markers: {markers.length}
            </p>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {markers.slice(0, 5).map((marker, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-xs flex items-center gap-2"
                >
                  <div className={`w-2 h-2 rounded-full ${getMarkerColor(marker.threatScore)}`} />
                  <span className="font-mono text-muted-foreground">{marker.ip}</span>
                  <span className="text-muted-foreground/70">({marker.country})</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
