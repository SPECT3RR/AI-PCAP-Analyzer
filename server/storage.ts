import { type InsertPcapAnalysis, type PcapAnalysis, pcapAnalyses } from "@shared/schema";
import { randomUUID } from "crypto";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createAnalysis(analysis: InsertPcapAnalysis): Promise<PcapAnalysis>;
  getAnalysis(id: string): Promise<PcapAnalysis | undefined>;
  getAllAnalyses(): Promise<PcapAnalysis[]>;
  deleteAnalysis(id: string): Promise<void>;
}


export class MemStorage implements IStorage {
  private analyses: Map<string, PcapAnalysis>;

  constructor() {
    this.analyses = new Map();
  }

  async createAnalysis(insertAnalysis: InsertPcapAnalysis): Promise<PcapAnalysis> {
    const id = randomUUID();
    const analysis: PcapAnalysis = {
      id,
      uploadedAt: new Date(),
      filename: insertAnalysis.filename,
      filesize: insertAnalysis.filesize,
      totalPackets: insertAnalysis.totalPackets,
      uniqueIps: insertAnalysis.uniqueIps,
      prediction: insertAnalysis.prediction,
      maliciousPercent: insertAnalysis.maliciousPercent,
      confidence: insertAnalysis.confidence,
      geoData: insertAnalysis.geoData as any,
      iocs: insertAnalysis.iocs as any,
    };
    this.analyses.set(id, analysis);
    return analysis;
  }

  async getAnalysis(id: string): Promise<PcapAnalysis | undefined> {
    return this.analyses.get(id);
  }

  async getAllAnalyses(): Promise<PcapAnalysis[]> {
    return Array.from(this.analyses.values()).sort(
      (a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()
    );
  }

  async deleteAnalysis(id: string): Promise<void> {
    this.analyses.delete(id);
  }
}

async function createStorage(): Promise<IStorage> {
  if (process.env.DATABASE_URL) {
    const { db } = await import("../db/index");
    return new DbStorageImpl(db);
  }
  return new MemStorage();
}

class DbStorageImpl implements IStorage {
  constructor(private db: any) {}

  async createAnalysis(insertAnalysis: InsertPcapAnalysis): Promise<PcapAnalysis> {
    const [analysis] = await this.db.insert(pcapAnalyses).values({
      filename: insertAnalysis.filename,
      filesize: insertAnalysis.filesize,
      totalPackets: insertAnalysis.totalPackets,
      uniqueIps: insertAnalysis.uniqueIps,
      prediction: insertAnalysis.prediction,
      maliciousPercent: insertAnalysis.maliciousPercent,
      confidence: insertAnalysis.confidence,
      geoData: insertAnalysis.geoData as any,
      iocs: insertAnalysis.iocs as any,
    }).returning();
    return analysis;
  }

  async getAnalysis(id: string): Promise<PcapAnalysis | undefined> {
    const [analysis] = await this.db.select().from(pcapAnalyses).where(eq(pcapAnalyses.id, id));
    return analysis;
  }

  async getAllAnalyses(): Promise<PcapAnalysis[]> {
    return await this.db.select().from(pcapAnalyses).orderBy(desc(pcapAnalyses.uploadedAt));
  }

  async deleteAnalysis(id: string): Promise<void> {
    await this.db.delete(pcapAnalyses).where(eq(pcapAnalyses.id, id));
  }
}

export const storage = await createStorage();
