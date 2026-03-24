import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { supabase } from "../../lib/supabase";
import LiveFeed from "../components/LiveFeed";
import DashMarquee from "../components/DashMarquee";

type EntryLog = {
  id: string;
  name: string | null;
  recognized: boolean;
  confidence: number;
  detectedAt: Date;
};

export default function LiveActivityPage() {
  const [logs, setLogs] = useState<EntryLog[]>([]);
  const [paused, setPaused] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchLogs() {
    const { data } = await supabase
      .from("results")
      .select("id, status, confidence, created_at, persons(name)")
      .order("created_at", { ascending: false })
      .limit(30);

    if (!data) return;

    const formatted: EntryLog[] = data.map((r: any) => ({
      id: r.id,
      name: r.persons?.name ?? null,
      recognized: r.status === "recognized",
      confidence: r.confidence,
      detectedAt: new Date(r.created_at),
    }));

    setLogs(formatted);
    setLoading(false);
  }

  useEffect(() => {
    

    async function init() {
      await fetchLogs();
    }

    init();

    if (paused) return;

    const interval = setInterval(() => {
      fetchLogs();
    }, 3500);

    return () => {
      
      clearInterval(interval);
    };
  }, [paused]);

  if (loading) {
    return (
      <div className="text-sm text-gray-400 p-6">Loading live feed...</div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between"
      >
        <div>
          <h2
            className="text-lg font-bold"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Live Detection Feed
          </h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            New events appear automatically every ~3.5 seconds
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-1.5 text-xs"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
              style={{ boxShadow: "0 0 5px rgba(52,211,153,0.7)" }}
            />
            {logs.length} events
          </div>
          <button
            onClick={() => setPaused((p) => !p)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: paused ? "rgba(249,115,22,0.12)" : "var(--bg-card)",
              border: `1px solid ${paused ? "rgba(249,115,22,0.3)" : "var(--border-base)"}`,
              color: paused ? "#fb923c" : "var(--text-secondary)",
            }}
          >
            <RefreshCw
              size={12}
              className={paused ? "" : "animate-spin"}
              style={{ animationDuration: "3s" }}
            />
            {paused ? "Resume" : "Pause"}
          </button>
        </div>
      </motion.div>

      {/* Marquee */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <DashMarquee logs={logs.slice(0, 12)} />
      </motion.div>

      {/* Full table */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <LiveFeed logs={logs} maxRows={30} />
      </motion.div>
    </div>
  );
}
