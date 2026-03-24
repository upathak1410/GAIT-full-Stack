import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { EntryLog } from "../data/mockData";

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function ConfidenceBadge({ value }: { value: number }) {
  const color = value >= 80 ? "#34d399" : value >= 50 ? "#fb923c" : "#f87171";
  return (
    <span className="text-xs font-mono font-semibold" style={{ color }}>
      {value.toFixed(1)}%
    </span>
  );
}

function StatusBadge({ recognized }: { recognized: boolean }) {
  return recognized ? (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium w-fit"
      style={{
        background: "rgba(52,211,153,0.1)",
        border: "1px solid rgba(52,211,153,0.25)",
        color: "#34d399",
      }}
    >
      <CheckCircle2 size={10} />
      Recognized
    </span>
  ) : (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium w-fit"
      style={{
        background: "rgba(248,113,113,0.1)",
        border: "1px solid rgba(248,113,113,0.25)",
        color: "#f87171",
      }}
    >
      <AlertCircle size={10} />
      Unrecognized
    </span>
  );
}

interface Props {
  logs: EntryLog[];
  maxRows?: number;
  compact?: boolean;
}

export default function LiveFeed({
  logs,
  maxRows = 10,
  compact = false,
}: Props) {
  const visible = logs.slice(0, maxRows);
  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{ border: "1px solid var(--border-base)" }}
    >
      {/* Header row */}
      <div
        className="grid px-4 py-2.5 text-xs font-semibold uppercase tracking-widest"
        style={{
          gridTemplateColumns: compact
            ? "1fr auto auto"
            : "1fr 140px 90px 90px",
          background: "var(--bg-surface)",
          borderBottom: "1px solid var(--border-base)",
          color: "var(--text-muted)",
        }}
      >
        <span>Identity</span>
        {!compact && <span className="text-center">Status</span>}
        <span className="text-center">Confidence</span>
        <span className="text-right">Time</span>
      </div>

      <AnimatePresence initial={false}>
        {visible.map((log, i) => (
          <motion.div
            key={log.id}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="grid px-4 py-3 items-center"
            style={{
              gridTemplateColumns: compact
                ? "1fr auto auto"
                : "1fr 140px 90px 90px",
              borderBottom: "1px solid var(--border-base)",
              background:
                i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.012)",
            }}
          >
            {/* Name */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                style={{
                  background: log.recognized
                    ? "rgba(52,211,153,0.12)"
                    : "rgba(248,113,113,0.12)",
                  color: log.recognized ? "#34d399" : "#f87171",
                  border: `1px solid ${log.recognized ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`,
                }}
              >
                {log.name ? log.name[0].toUpperCase() : "?"}
              </div>
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {log.name ?? "Unknown Person"}
              </span>
            </div>

            {/* Status */}
            {!compact && (
              <div className="flex justify-center">
                <StatusBadge recognized={log.recognized} />
              </div>
            )}

            {/* Confidence */}
            <div className="text-center">
              <ConfidenceBadge value={log.confidence} />
            </div>

            {/* Time */}
            <div
              className="flex items-center justify-end gap-1"
              style={{ color: "var(--text-muted)" }}
            >
              <Clock size={10} />
              <span className="text-xs font-mono">
                {formatTime(log.detectedAt)}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { StatusBadge, ConfidenceBadge };
