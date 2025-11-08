import { motion } from "framer-motion";
import { Shield, Upload, BarChart3, FileSearch, Zap, Globe, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@assets/generated_images/Cybersecurity_network_visualization_hero_38953c2e.png";

interface LandingPageProps {
  onStartAnalysis: () => void;
}

export default function LandingPage({ onStartAnalysis }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Shield className="w-12 h-12 text-neon-cyan" />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-cyan via-primary to-neon-purple bg-clip-text text-transparent">
                AI-PCAP Analyzer
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              Automated AI Analysis of Network Traffic
            </p>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              Detect and visualize potential malicious patterns efficiently with machine learning-powered threat detection, 
              real-time GeoIP visualization, and comprehensive IOC exploration.
            </p>

            <Button
              size="lg"
              onClick={onStartAnalysis}
              className="bg-gradient-to-r from-neon-cyan to-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-lg px-8 py-6 h-auto"
              data-testid="button-start-analysis"
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-cyan">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Three simple steps to comprehensive network analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Upload,
              title: "Upload",
              description: "Drop your PCAP file and let our AI engine begin processing your network traffic data.",
              step: "01"
            },
            {
              icon: BarChart3,
              title: "Analyze",
              description: "Machine learning models classify traffic patterns and extract indicators of compromise in real-time.",
              step: "02"
            },
            {
              icon: FileSearch,
              title: "Visualize",
              description: "Interactive dashboard reveals patterns, threats, and geographic origins with comprehensive reports.",
              step: "03"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <Card className="glass glass-hover p-8 text-center h-full border-card-border" data-testid={`card-step-${idx}`}>
                <div className="relative mb-6">
                  <span className="absolute -top-4 -left-4 text-6xl font-bold text-primary/20">
                    {item.step}
                  </span>
                  <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 neon-text-purple">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for comprehensive network threat analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {[
            {
              icon: Shield,
              title: "ML-Based Threat Detection",
              description: "Advanced machine learning algorithms classify malicious traffic patterns with high accuracy."
            },
            {
              icon: Globe,
              title: "Interactive GeoIP Mapping",
              description: "Visualize threat origins on an interactive world map with real-time geographic intelligence."
            },
            {
              icon: BarChart3,
              title: "Comprehensive Analytics",
              description: "Time-series charts, protocol distribution, and traffic anomaly detection at your fingertips."
            },
            {
              icon: FileSearch,
              title: "IOC Explorer",
              description: "Detailed indicators of compromise with threat scoring and sortable, filterable tables."
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              <Card className="glass glass-hover p-6 flex gap-4 border-card-border" data-testid={`card-feature-${idx}`}>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <Card className="glass p-12 max-w-3xl mx-auto border-card-border">
            <h2 className="text-3xl font-bold mb-4 text-foreground">
              Ready to Analyze Your Network Traffic?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Upload your PCAP file and get instant insights into potential security threats
            </p>
            <Button
              size="lg"
              onClick={onStartAnalysis}
              className="bg-gradient-to-r from-neon-cyan to-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 text-lg px-8 py-6 h-auto"
              data-testid="button-start-analysis-cta"
            >
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
            <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-threat-benign" />
                <span>Offline Processing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-threat-benign" />
                <span>Privacy Focused</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-threat-benign" />
                <span>Fast Results</span>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
