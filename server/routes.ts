import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { analyzePcapFile } from "./pcap-analyzer";
import multer from "multer";
import { z } from "zod";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (file.originalname.endsWith('.pcap') || file.originalname.endsWith('.pcapng')) {
      cb(null, true);
    } else {
      cb(new Error('Only .pcap and .pcapng files are allowed'));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/analyze", upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const { originalname, size } = req.file;

      const analysisResult = await analyzePcapFile(originalname, size);

      const dataToInsert = {
        filename: originalname,
        filesize: size,
        totalPackets: analysisResult.totalPackets,
        uniqueIps: analysisResult.uniqueIps,
        prediction: analysisResult.prediction,
        maliciousPercent: analysisResult.maliciousPercent,
        confidence: analysisResult.confidence,
        geoData: analysisResult.geoData,
        iocs: analysisResult.iocs,
      };

      const analysis = await storage.createAnalysis(dataToInsert);

      res.json({
        id: analysis.id,
        summary: {
          packets: analysis.totalPackets,
          unique_ips: analysis.uniqueIps,
          prediction: analysis.prediction,
          malicious_percent: analysis.maliciousPercent,
          confidence: analysis.confidence,
        },
        geo: analysis.geoData,
        iocs: analysis.iocs,
      });
    } catch (error: any) {
      console.error("Error analyzing PCAP:", error);
      res.status(500).json({ error: error.message || "Failed to analyze PCAP file" });
    }
  });

  app.get("/api/analyses", async (req, res) => {
    try {
      const analyses = await storage.getAllAnalyses();
      res.json(analyses);
    } catch (error: any) {
      console.error("Error fetching analyses:", error);
      res.status(500).json({ error: "Failed to fetch analyses" });
    }
  });

  app.get("/api/analysis/:id", async (req, res) => {
    try {
      const analysis = await storage.getAnalysis(req.params.id);
      
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json({
        id: analysis.id,
        summary: {
          packets: analysis.totalPackets,
          unique_ips: analysis.uniqueIps,
          prediction: analysis.prediction,
          malicious_percent: analysis.maliciousPercent,
          confidence: analysis.confidence,
        },
        geo: analysis.geoData,
        iocs: analysis.iocs,
      });
    } catch (error: any) {
      console.error("Error fetching analysis:", error);
      res.status(500).json({ error: "Failed to fetch analysis" });
    }
  });

  app.post("/api/report/:id", async (req, res) => {
    try {
      const analysis = await storage.getAnalysis(req.params.id);
      
      if (!analysis) {
        return res.status(404).json({ error: "Analysis not found" });
      }

      res.json({
        message: "PDF report generation will be implemented with WeasyPrint",
        filename: `pcap-report-${analysis.id}.pdf`,
      });
    } catch (error: any) {
      console.error("Error generating report:", error);
      res.status(500).json({ error: "Failed to generate report" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
