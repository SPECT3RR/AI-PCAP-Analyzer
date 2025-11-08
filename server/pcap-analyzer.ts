interface AnalysisResult {
  totalPackets: number;
  uniqueIps: number;
  prediction: string;
  maliciousPercent: number;
  confidence: number;
  geoData: Array<{
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

const attackTypes = ["DDoS Attack", "Port Scan", "Brute Force", "Malware C2", "Data Exfiltration"];

const countries = [
  { name: "United States", lat: 37.7749, lon: -122.4194 },
  { name: "Russia", lat: 55.7558, lon: 37.6173 },
  { name: "China", lat: 39.9042, lon: 116.4074 },
  { name: "Germany", lat: 52.5200, lon: 13.4050 },
  { name: "Japan", lat: 35.6762, lon: 139.6503 },
  { name: "Brazil", lat: -23.5505, lon: -46.6333 },
  { name: "India", lat: 28.6139, lon: 77.2090 },
  { name: "United Kingdom", lat: 51.5074, lon: -0.1278 },
  { name: "France", lat: 48.8566, lon: 2.3522 },
  { name: "South Korea", lat: 37.5665, lon: 126.9780 },
];

function generateRandomIP(): string {
  return `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
}

function generateRandomHash(): string {
  const chars = '0123456789abcdef';
  let hash = '';
  for (let i = 0; i < 32; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

function generateRandomDomain(): string {
  const prefixes = ['malicious', 'suspicious', 'unknown', 'bad', 'evil', 'dark'];
  const suffixes = ['site', 'server', 'network', 'domain', 'host'];
  const tlds = ['com', 'net', 'org', 'ru', 'cn'];
  
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const tld = tlds[Math.floor(Math.random() * tlds.length)];
  
  return `${prefix}-${suffix}.${tld}`;
}

export async function analyzePcapFile(filename: string, filesize: number): Promise<AnalysisResult> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  const totalPackets = Math.floor(Math.random() * 50000) + 10000;
  const uniqueIps = Math.floor(Math.random() * 200) + 50;
  const prediction = attackTypes[Math.floor(Math.random() * attackTypes.length)];
  const maliciousPercent = Math.random() * 15 + 5;
  const confidence = Math.random() * 15 + 85;

  const numGeoPoints = Math.floor(Math.random() * 5) + 3;
  const geoData = [];
  for (let i = 0; i < numGeoPoints; i++) {
    const country = countries[Math.floor(Math.random() * countries.length)];
    geoData.push({
      ip: generateRandomIP(),
      country: country.name,
      lat: country.lat,
      lon: country.lon,
    });
  }

  const numIOCs = Math.floor(Math.random() * 10) + 5;
  const iocs = [];
  const types: Array<"IP" | "Domain" | "Hash"> = ["IP", "Domain", "Hash"];
  
  for (let i = 0; i < numIOCs; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    let value: string;
    
    if (type === "IP") {
      value = generateRandomIP();
    } else if (type === "Domain") {
      value = generateRandomDomain();
    } else {
      value = generateRandomHash();
    }
    
    const now = new Date();
    const minutesAgo = Math.floor(Math.random() * 60);
    const timestamp = new Date(now.getTime() - minutesAgo * 60000);
    
    iocs.push({
      id: `ioc-${i}`,
      type,
      value,
      threatScore: Math.floor(Math.random() * 100),
      firstSeen: timestamp.toISOString().slice(0, 16).replace('T', ' '),
      count: Math.floor(Math.random() * 500) + 10,
    });
  }

  return {
    totalPackets,
    uniqueIps,
    prediction,
    maliciousPercent,
    confidence,
    geoData,
    iocs,
  };
}
