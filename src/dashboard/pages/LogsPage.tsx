import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { StatusBadge, ConfidenceBadge } from "../components/LiveFeed";
import { Clock } from "lucide-react";

function formatDateTime(d: Date) {
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export default function LogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "recognized" | "unrecognized">(
    "all",
  );
  const [minConf, setMinConf] = useState(0);
  const [maxConf, setMaxConf] = useState(100);
  const [showFilter, setShowFilter] = useState(false);

  async function fetchLogs() {
    const { data } = await supabase
      .from("results")
      .select("id, status, confidence, created_at, persons(name)")
      .order("created_at", { ascending: false });

    if (!data) return;

    const formatted = data.map((r: any) => ({
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
  }, []);
  if (loading) {
    return <div className="text-sm text-gray-400 p-6">Loading logs...</div>;
  }

  const filtered = logs.filter((l) => {
    const name = l.name?.toLowerCase() ?? "unknown";

    if (search && !name.includes(search.toLowerCase())) return false;
    if (filter === "recognized" && !l.recognized) return false;
    if (filter === "unrecognized" && l.recognized) return false;
    if (l.confidence < minConf || l.confidence > maxConf) return false;

    return true;
  });

  return (
    <div className="space-y-5">
      {/* Header + controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2
              className="text-lg font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--text-primary)",
              }}
            >
              Detection Logs
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              {filtered.length} of {logs.length} entries
            </p>
          </div>
          <button
            onClick={() => setShowFilter((f) => !f)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{
              background: showFilter
                ? "rgba(249,115,22,0.12)"
                : "var(--bg-card)",
              border: `1px solid ${showFilter ? "rgba(249,115,22,0.3)" : "var(--border-base)"}`,
              color: showFilter ? "#fb923c" : "var(--text-secondary)",
            }}
          >
            <Filter size={12} />
            Filters
            <ChevronDown
              size={12}
              style={{
                transform: showFilter ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: "var(--text-muted)" }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-base)",
              color: "var(--text-primary)",
              fontFamily: "var(--font-body)",
            }}
            onFocus={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                "rgba(249,115,22,0.35)";
            }}
            onBlur={(e) => {
              (e.target as HTMLInputElement).style.borderColor =
                "var(--border-base)";
            }}
          />
        </div>

        {/* Expanded filters */}
        {showFilter && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-4"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-base)",
            }}
          >
            {/* Status filter */}
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Status
              </label>
              <div className="flex gap-2">
                {(["all", "recognized", "unrecognized"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setFilter(v)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all duration-200"
                    style={{
                      background:
                        filter === v
                          ? "rgba(249,115,22,0.15)"
                          : "var(--bg-surface)",
                      border: `1px solid ${filter === v ? "rgba(249,115,22,0.35)" : "var(--border-base)"}`,
                      color: filter === v ? "#fb923c" : "var(--text-secondary)",
                    }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            {/* Min confidence */}
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Min Confidence: {minConf}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={minConf}
                onChange={(e) => setMinConf(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>

            {/* Max confidence */}
            <div>
              <label
                className="text-xs font-semibold uppercase tracking-wider block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Max Confidence: {maxConf}%
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={maxConf}
                onChange={(e) => setMaxConf(Number(e.target.value))}
                className="w-full accent-orange-500 cursor-pointer"
              />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="overflow-hidden rounded-2xl"
        style={{ border: "1px solid var(--border-base)" }}
      >
        {/* Header */}
        <div
          className="grid px-5 py-3 text-xs font-semibold uppercase tracking-widest"
          style={{
            gridTemplateColumns: "2fr 150px 100px 150px",
            background: "var(--bg-surface)",
            borderBottom: "1px solid var(--border-base)",
            color: "var(--text-muted)",
          }}
        >
          <span>Identity</span>
          <span>Status</span>
          <span>Confidence</span>
          <span className="text-right">Detected At</span>
        </div>

        {filtered.length === 0 ? (
          <div
            className="py-16 text-center"
            style={{ color: "var(--text-muted)" }}
          >
            <p className="text-sm">No entries match your filters.</p>
          </div>
        ) : (
          filtered.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.4) }}
              className="grid px-5 py-3.5 items-center"
              style={{
                gridTemplateColumns: "2fr 150px 100px 150px",
                borderBottom:
                  i < filtered.length - 1
                    ? "1px solid var(--border-base)"
                    : "none",
                background:
                  i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              }}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{
                    background: log.recognized
                      ? "rgba(52,211,153,0.12)"
                      : "rgba(248,113,113,0.12)",
                    color: log.recognized ? "#34d399" : "#f87171",
                    border: `1px solid ${log.recognized ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                  }}
                >
                  {log.name ? log.name[0] : "?"}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {log.name ?? "Unknown Person"}
                </span>
              </div>
              <StatusBadge recognized={log.recognized} />
              <ConfidenceBadge value={log.confidence} />
              <div
                className="flex items-center justify-end gap-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                <Clock size={11} />
                <span className="text-xs font-mono">
                  {formatDateTime(log.detectedAt)}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
}
