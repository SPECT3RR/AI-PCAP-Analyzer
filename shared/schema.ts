import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, real, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pcapAnalyses = pgTable("pcap_analyses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  filename: text("filename").notNull(),
  filesize: integer("filesize").notNull(),
  uploadedAt: timestamp("uploaded_at").notNull().defaultNow(),
  
  totalPackets: integer("total_packets").notNull(),
  uniqueIps: integer("unique_ips").notNull(),
  prediction: text("prediction").notNull(),
  maliciousPercent: real("malicious_percent").notNull(),
  confidence: real("confidence").notNull(),
  
  geoData: jsonb("geo_data").notNull().$type<Array<{
    ip: string;
    country: string;
    lat: number;
    lon: number;
  }>>(),
  
  iocs: jsonb("iocs").notNull().$type<Array<{
    id: string;
    type: "IP" | "Domain" | "Hash";
    value: string;
    threatScore: number;
    firstSeen: string;
    count: number;
  }>>(),
});

export const insertPcapAnalysisSchema = createInsertSchema(pcapAnalyses).omit({
  id: true,
  uploadedAt: true,
});

export type InsertPcapAnalysis = z.infer<typeof insertPcapAnalysisSchema>;
export type PcapAnalysis = typeof pcapAnalyses.$inferSelect;
