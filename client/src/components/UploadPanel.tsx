import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileType, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface UploadPanelProps {
  onFileSelect: (file: File) => void;
  isAnalyzing?: boolean;
}

export default function UploadPanel({ onFileSelect, isAnalyzing = false }: UploadPanelProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.pcap') || file.name.endsWith('.pcapng')) {
        setSelectedFile(file);
      }
    }
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  }, []);

  const handleAnalyze = () => {
    if (selectedFile) {
      onFileSelect(selectedFile);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl"
      >
        <Card className="glass p-12 border-card-border">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 neon-text-cyan">
              Upload PCAP File
            </h2>
            <p className="text-muted-foreground">
              Drag and drop your network capture file or click to browse
            </p>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-lg p-12 transition-all duration-300
              ${isDragging 
                ? 'border-primary bg-primary/10 scale-105' 
                : 'border-border hover:border-primary/50 hover:bg-card'
              }
            `}
            data-testid="dropzone-upload"
          >
            <input
              type="file"
              id="file-upload"
              accept=".pcap,.pcapng"
              onChange={handleFileInput}
              className="hidden"
              data-testid="input-file"
            />
            
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex flex-col items-center gap-4">
                {selectedFile ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-threat-benign to-primary flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-foreground flex items-center gap-2 justify-center">
                        <FileType className="w-5 h-5 text-primary" />
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{
                        y: isDragging ? -10 : 0,
                      }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center"
                    >
                      <Upload className="w-10 h-10 text-primary" />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-lg font-medium text-foreground">
                        Drop your PCAP file here
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse (.pcap, .pcapng)
                      </p>
                    </div>
                  </>
                )}
              </div>
            </label>
          </div>

          {selectedFile && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex gap-4"
            >
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="flex-1 bg-gradient-to-r from-neon-cyan to-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/50 transition-all"
                data-testid="button-analyze"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Analyze Network Traffic
                  </>
                )}
              </Button>
              <Button
                onClick={() => setSelectedFile(null)}
                variant="outline"
                disabled={isAnalyzing}
                data-testid="button-clear"
              >
                Clear
              </Button>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
            >
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-primary animate-spin" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Processing PCAP file...</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Extracting flows, analyzing patterns, and geolocating IPs
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}
