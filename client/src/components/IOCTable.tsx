import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FileSearch, Search, ArrowUpDown } from "lucide-react";

interface IOC {
  id: string;
  type: "IP" | "Domain" | "Hash";
  value: string;
  threatScore: number;
  firstSeen: string;
  count: number;
}

interface IOCTableProps {
  iocs?: IOC[];
}

export default function IOCTable({ iocs = [] }: IOCTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<keyof IOC>("threatScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getThreatBadge = (score: number) => {
    if (score >= 60) {
      return <Badge className="bg-threat-malicious/20 text-threat-malicious border-threat-malicious/30">Malicious</Badge>;
    } else if (score >= 30) {
      return <Badge className="bg-threat-suspicious/20 text-threat-suspicious border-threat-suspicious/30">Suspicious</Badge>;
    }
    return <Badge className="bg-threat-benign/20 text-threat-benign border-threat-benign/30">Benign</Badge>;
  };

  const filteredIOCs = iocs.filter(ioc =>
    ioc.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedIOCs = [...filteredIOCs].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    const comparison = aVal > bVal ? 1 : -1;
    return sortOrder === "asc" ? comparison : -comparison;
  });

  const handleSort = (key: keyof IOC) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("desc");
    }
  };

  return (
    <Card className="glass p-6 border-card-border" data-testid="card-ioc-table">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">IOC Explorer</h3>
          <span className="text-sm text-muted-foreground">({iocs.length} indicators)</span>
        </div>
        
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search IOCs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50"
            data-testid="input-search-ioc"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort("type")}
                  className="flex items-center gap-1 hover-elevate rounded px-2 py-1"
                  data-testid="button-sort-type"
                >
                  Type
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort("value")}
                  className="flex items-center gap-1 hover-elevate rounded px-2 py-1"
                  data-testid="button-sort-value"
                >
                  Value
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort("threatScore")}
                  className="flex items-center gap-1 hover-elevate rounded px-2 py-1"
                  data-testid="button-sort-threat"
                >
                  Threat Level
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort("count")}
                  className="flex items-center gap-1 hover-elevate rounded px-2 py-1"
                  data-testid="button-sort-count"
                >
                  Count
                  <ArrowUpDown className="w-3 h-3" />
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                First Seen
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedIOCs.map((ioc, idx) => (
              <motion.tr
                key={ioc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="border-b border-border/50 hover-elevate"
                data-testid={`row-ioc-${idx}`}
              >
                <td className="py-3 px-4">
                  <Badge variant="outline" className="font-mono text-xs">
                    {ioc.type}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <code className="text-sm text-foreground">{ioc.value}</code>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {getThreatBadge(ioc.threatScore)}
                    <span className="text-xs text-muted-foreground">({ioc.threatScore})</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-foreground">{ioc.count}</span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-muted-foreground">{ioc.firstSeen}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {sortedIOCs.length === 0 && (
          <div className="text-center py-12">
            <FileSearch className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "No IOCs match your search" : "No IOCs detected"}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
