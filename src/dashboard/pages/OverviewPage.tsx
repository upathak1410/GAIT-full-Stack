import { motion } from "framer-motion";
import { Activity, CheckCircle2, AlertCircle, Percent } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { getStats } from "../data/data";
import StatCard from "../components/StatCard";
import LiveFeed from "../components/LiveFeed";
import DashMarquee from "../components/DashMarquee";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function MiniPie({
  recognized,
  unrecognized,
}: {
  recognized: number;
  unrecognized: number;
}) {
  const data = [
    { name: "Recognized", value: recognized },
    { name: "Unrecognized", value: unrecognized },
  ];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={75}
          paddingAngle={3}
          dataKey="value"
        >
          <Cell fill="#34d399" />
          <Cell fill="#f87171" />
        </Pie>
        <Tooltip
          contentStyle={{
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-base)",
            borderRadius: 10,
            fontSize: 12,
          }}
          labelStyle={{ color: "var(--text-primary)" }}
          itemStyle={{ color: "var(--text-secondary)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default function OverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const [statsData, logsRes] = await Promise.all([
      getStats(),
      supabase
        .from("results")
        .select("id, status, confidence, created_at, persons(name)")
        .order("created_at", { ascending: false })
        .limit(8),
    ]);

    const formattedLogs =
      logsRes.data?.map((r: any) => ({
        id: r.id,
        name: r.persons?.name ?? null,
        recognized: r.status === "recognized",
        confidence: r.confidence,
        detectedAt: new Date(r.created_at),
      })) ?? [];

    setStats(statsData);
    setLogs(formattedLogs);
    setLoading(false);
  }

  useEffect(() => {
    async function init() {
      await fetchData();
    }

    init();
  }, []);

  if (loading || !stats) {
    return <div className="text-sm text-gray-400 p-6">Loading overview...</div>;
  }
  const recent = logs;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Detections"
          value={stats.total}
          icon={Activity}
          iconColor="#fb923c"
          iconBg="rgba(249,115,22,0.1)"
          glowColor="rgba(249,115,22,0.15)"
          delay={0}
        />
        <StatCard
          label="Recognized"
          value={stats.recognized}
          icon={CheckCircle2}
          iconColor="#34d399"
          iconBg="rgba(52,211,153,0.1)"
          glowColor="rgba(52,211,153,0.12)"
          delay={0.07}
        />
        <StatCard
          label="Unrecognized"
          value={stats.unrecognized}
          icon={AlertCircle}
          iconColor="#f87171"
          iconBg="rgba(248,113,113,0.1)"
          glowColor="rgba(248,113,113,0.12)"
          delay={0.14}
        />
        <StatCard
          label="Avg Confidence"
          value={`${stats.avgConf}%`}
          icon={Percent}
          iconColor="#fb923c"
          iconBg="rgba(249,115,22,0.1)"
          glowColor="rgba(249,115,22,0.12)"
          delay={0.21}
        />
      </div>

      {/* Live feed marquee */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <DashMarquee logs={logs} />
      </motion.div>

      {/* Middle row */}
      <div className="grid lg:grid-cols-3 gap-4">
        {/* Recent activity */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2
              className="text-sm font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Recent Detections
            </h2>
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              Last 8 events
            </span>
          </div>
          <LiveFeed logs={recent} maxRows={8} />
        </motion.div>

        {/* Mini pie */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="rounded-2xl p-5"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-base)",
          }}
        >
          <h2
            className="text-sm font-semibold mb-1"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Recognition Split
          </h2>
          <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
            All-time distribution
          </p>
          <MiniPie
            recognized={stats.recognized}
            unrecognized={stats.unrecognized}
          />
          <div className="flex justify-center gap-5 mt-2">
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#34d399" }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Recognized ({stats.recognized})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#f87171" }}
              />
              <span
                className="text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                Unknown ({stats.unrecognized})
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
