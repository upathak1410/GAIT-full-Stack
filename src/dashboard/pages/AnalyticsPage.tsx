import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";
import { getStats, getHourlyData, getConfidenceBuckets } from "../data/data";
import StatCard from "../components/StatCard";
import { TrendingUp, Percent } from "lucide-react";
import { useEffect, useState } from "react";

const TOOLTIP_STYLE = {
  contentStyle: {
    background: "#0d0d0d",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    fontSize: 12,
  },
  labelStyle: { color: "#ffffff" },
  itemStyle: { color: "rgba(255,255,255,0.6)" },
};

const AXIS_STYLE = { fill: "rgba(255,255,255,0.3)", fontSize: 11 };
const GRID_STYLE = { stroke: "rgba(255,255,255,0.04)" };

function SectionCard({
  title,
  sub,
  children,
  delay = 0,
}: {
  title: string;
  sub?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl p-5"
      style={{
        background: "var(--bg-card)",
        border: "1px solid var(--border-base)",
      }}
    >
      <div className="mb-4">
        <h3
          className="text-sm font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          {title}
        </h3>
        {sub && (
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
            {sub}
          </p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<any>(null);
  const [hourly, setHourly] = useState<any[]>([]);
  const [confBkts, setConfBkts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsData, hourlyData, confData] = await Promise.all([
          getStats(),
          getHourlyData(),
          getConfidenceBuckets(),
        ]);

        setStats(statsData);
        setHourly(hourlyData);
        setConfBkts(confData);
      } catch (err) {
        console.error("Failed to load analytics", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading || !stats) {
    return (
      <div className="text-sm text-gray-400 p-6">Loading analytics...</div>
    );
  }

  const unrecoRate = ((stats.unrecognized / stats.total) * 100).toFixed(1);

  const pieData = [
    { name: "Recognized", value: stats.recognized },
    { name: "Unrecognized", value: stats.unrecognized },
  ];

  return (
    <div className="space-y-5">
      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Detections"
          value={stats.total}
          icon={TrendingUp}
          iconColor="#fb923c"
          iconBg="rgba(249,115,22,0.1)"
          delay={0}
        />
        <StatCard
          label="Avg Confidence"
          value={`${stats.avgConf}%`}
          icon={Percent}
          iconColor="#fb923c"
          iconBg="rgba(249,115,22,0.1)"
          delay={0.06}
        />
        <StatCard
          label="Recognition Rate"
          value={`${(100 - parseFloat(unrecoRate)).toFixed(1)}%`}
          icon={TrendingUp}
          iconColor="#34d399"
          iconBg="rgba(52,211,153,0.1)"
          delay={0.12}
        />
        <StatCard
          label="Unrecognized Rate"
          value={`${unrecoRate}%`}
          icon={TrendingUp}
          iconColor="#f87171"
          iconBg="rgba(248,113,113,0.1)"
          delay={0.18}
        />
      </div>

      {/* Row 2: Line + Pie */}
      <div className="grid lg:grid-cols-3 gap-4">
        <SectionCard
          title="Detections Over Time"
          sub="Hourly breakdown — recognized vs unrecognized"
          delay={0.22}
        >
          <div className="lg:col-span-2" style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={hourly}
                margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
              >
                <CartesianGrid strokeDasharray="3 3" {...GRID_STYLE} />
                <XAxis dataKey="hour" tick={AXIS_STYLE} />
                <YAxis tick={AXIS_STYLE} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Line
                  type="monotone"
                  dataKey="recognized"
                  stroke="#34d399"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="unrecognized"
                  stroke="#f87171"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="4 2"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-4 mt-3">
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <div
                className="w-3 h-0.5 rounded"
                style={{ background: "#34d399" }}
              />
              Recognized
            </div>
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <div
                className="w-3 h-0.5 rounded border-t-2 border-dashed"
                style={{ borderColor: "#f87171" }}
              />
              Unrecognized
            </div>
          </div>
        </SectionCard>

        {/* Pie */}
        <SectionCard
          title="Recognition Split"
          sub="Recognized vs Unrecognized"
          delay={0.28}
        >
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="#34d399" />
                  <Cell fill="#f87171" />
                </Pie>
                <Tooltip {...TOOLTIP_STYLE} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-5 mt-1">
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#34d399" }}
              />
              {stats.recognized} recognized
            </div>
            <div
              className="flex items-center gap-1.5 text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#f87171" }}
              />
              {stats.unrecognized} unknown
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Confidence distribution */}
      <SectionCard
        title="Confidence Distribution"
        sub="How confidence scores are spread across all detections"
        delay={0.34}
      >
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={confBkts}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <CartesianGrid strokeDasharray="3 3" {...GRID_STYLE} />
              <XAxis dataKey="range" tick={AXIS_STYLE} />
              <YAxis tick={AXIS_STYLE} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                {confBkts.map((entry, i) => (
                  <Cell
                    key={i}
                    fill={
                      entry.range.startsWith("9")
                        ? "#f97316"
                        : entry.range.startsWith("7") ||
                            entry.range.startsWith("8")
                          ? "#fb923c"
                          : "rgba(249,115,22,0.3)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SectionCard>
    </div>
  );
}
