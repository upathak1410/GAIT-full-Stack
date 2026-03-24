import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createResult } from "../data/data";
import {
  Upload,
  CheckCircle2,
  XCircle,
  Loader2,
  FileArchive,
  X,
  Fingerprint,
} from "lucide-react";

type Stage = "idle" | "ready" | "processing" | "success" | "failure";

function formatBytes(b: number) {
  if (b < 1024) return `${b} B`;
  if (b < 1024 * 1024) return `${(b / 1024).toFixed(1)} KB`;
  return `${(b / (1024 * 1024)).toFixed(2)} MB`;
}

export default function AuthenticatePage() {
  const [stage, setStage] = useState<Stage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{
    name: string;
    confidence: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.name.endsWith(".zip")) return;
    setFile(f);
    setStage("ready");
    setResult(null);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const verify = async () => {
    if (!file) return;

    setStage("processing");
    setProgress(10);

    try {
      const formData = new FormData();
      formData.append("file", file);

      console.log("FETCH REQUEST BHEJ RAHA HU")

      const res = await fetch("http://140.245.221.62:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      setProgress(60);

      const data = await res.json();

      console.log("DATA AA GAYA", data);

      const confidencePercent = data.confidence * 100;

      const recognized = confidencePercent >= 50;

      const formatted = {
        name: recognized ? data.prediction : null,
        confidence: confidencePercent,
        recognized,
      };

      setProgress(100);

      // UI update
      if (recognized) {
        setResult({
          name: formatted.name!,
          confidence: formatted.confidence,
        });
        setStage("success");
      } else {
        setResult({
          name: "Unrecognized Person",
          confidence: formatted.confidence,
        });
        setStage("failure");
      }

      // 🔥 store in DB (IMPORTANT)
      await createResult({
        name: formatted.name,
        recognized: formatted.recognized,
        confidence: formatted.confidence,
      });
    } catch (err) {
      console.error("Upload failed", err);
      setStage("failure");
    }
  };

  const reset = () => {
    setStage("idle");
    setFile(null);
    setProgress(0);
    setResult(null);
  };

  return (
    <div className="flex justify-center pt-4">
      <div className="w-full max-w-xl space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.45 }}
          className="text-center"
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{
              background:
                "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(234,88,12,0.12))",
              border: "1px solid rgba(249,115,22,0.3)",
              boxShadow: "0 0 40px rgba(249,115,22,0.15)",
            }}
          >
            <Fingerprint size={26} style={{ color: "#fb923c" }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Verify Identity
          </h2>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Upload a gait sample (.zip) to authenticate using biometric
            recognition
          </p>
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 space-y-5"
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-base)",
          }}
        >
          <AnimatePresence mode="wait">
            {/* IDLE / READY — upload zone */}
            {(stage === "idle" || stage === "ready") && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                {/* Drop zone */}
                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className="relative flex flex-col items-center justify-center gap-3 rounded-xl py-10 cursor-pointer transition-all duration-300"
                  style={{
                    border: `2px dashed ${dragging ? "rgba(249,115,22,0.6)" : stage === "ready" ? "rgba(249,115,22,0.35)" : "var(--border-base)"}`,
                    background: dragging
                      ? "rgba(249,115,22,0.06)"
                      : stage === "ready"
                        ? "rgba(249,115,22,0.04)"
                        : "var(--bg-surface)",
                    boxShadow: dragging
                      ? "0 0 30px rgba(249,115,22,0.1)"
                      : "none",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".zip"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFile(e.target.files[0]);
                    }}
                  />

                  {stage === "ready" && file ? (
                    <>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "rgba(249,115,22,0.12)",
                          border: "1px solid rgba(249,115,22,0.3)",
                        }}
                      >
                        <FileArchive size={22} style={{ color: "#fb923c" }} />
                      </div>
                      <div className="text-center">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {file.name}
                        </p>
                        <p
                          className="text-xs mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {formatBytes(file.size)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          reset();
                        }}
                        className="absolute top-3 right-3 w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-base)",
                          color: "var(--text-muted)",
                        }}
                      >
                        <X size={12} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{
                          background: "var(--bg-elevated)",
                          border: "1px solid var(--border-base)",
                        }}
                      >
                        <Upload
                          size={20}
                          style={{ color: "var(--text-muted)" }}
                        />
                      </div>
                      <div className="text-center">
                        <p
                          className="text-sm font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          Drop your gait sample here
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ color: "var(--text-muted)" }}
                        >
                          or click to browse — .zip only
                        </p>
                      </div>
                    </>
                  )}
                </div>

                {/* Verify button */}
                <button
                  onClick={verify}
                  disabled={stage !== "ready"}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  style={{
                    background:
                      stage === "ready"
                        ? "linear-gradient(135deg,#f97316,#ea580c)"
                        : "var(--bg-surface)",
                    color: stage === "ready" ? "#fff" : "var(--text-muted)",
                    border:
                      stage === "ready"
                        ? "none"
                        : "1px solid var(--border-base)",
                    boxShadow:
                      stage === "ready"
                        ? "0 0 30px rgba(249,115,22,0.35)"
                        : "none",
                    cursor: stage !== "ready" ? "not-allowed" : "pointer",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  <Fingerprint size={16} />
                  Verify Identity
                </button>
              </motion.div>
            )}

            {/* PROCESSING */}
            {stage === "processing" && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-8 flex flex-col items-center gap-5"
              >
                <div className="relative">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "rgba(249,115,22,0.1)",
                      border: "1px solid rgba(249,115,22,0.25)",
                      boxShadow: "0 0 30px rgba(249,115,22,0.15)",
                    }}
                  >
                    <Loader2
                      size={28}
                      className="animate-spin"
                      style={{ color: "#fb923c" }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-base font-semibold mb-1"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    Processing gait...
                  </p>
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                    Extracting skeletal keypoints and computing embedding
                  </p>
                </div>
                {/* Progress bar */}
                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: 4, background: "var(--bg-surface)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(to right,#f97316,#fb923c)",
                      boxShadow: "0 0 8px rgba(249,115,22,0.5)",
                    }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
                <p
                  className="text-xs font-mono"
                  style={{ color: "var(--text-muted)" }}
                >
                  {Math.round(progress)}%
                </p>
              </motion.div>
            )}

            {/* SUCCESS */}
            {stage === "success" && result && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 flex flex-col items-center gap-5"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(52,211,153,0.12)",
                    border: "1px solid rgba(52,211,153,0.35)",
                    boxShadow: "0 0 40px rgba(52,211,153,0.2)",
                  }}
                >
                  <CheckCircle2 size={30} style={{ color: "#34d399" }} />
                </motion.div>

                <div className="text-center">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "#34d399" }}
                  >
                    Match Found
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {result.name}
                  </p>
                </div>

                <div
                  className="w-full rounded-xl p-4 text-center"
                  style={{
                    background: "rgba(52,211,153,0.06)",
                    border: "1px solid rgba(52,211,153,0.2)",
                  }}
                >
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Confidence Score
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#34d399",
                      textShadow: "0 0 20px rgba(52,211,153,0.4)",
                    }}
                  >
                    {result.confidence.toFixed(1)}%
                  </p>
                </div>

                <button
                  onClick={reset}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-base)",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(249,115,22,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#fb923c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border-base)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-secondary)";
                  }}
                >
                  Verify Another
                </button>
              </motion.div>
            )}

            {/* FAILURE */}
            {stage === "failure" && (
              <motion.div
                key="failure"
                initial={{ opacity: 0, scale: 0.94, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-6 flex flex-col items-center gap-5"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "rgba(248,113,113,0.12)",
                    border: "1px solid rgba(248,113,113,0.35)",
                    boxShadow: "0 0 40px rgba(248,113,113,0.2)",
                  }}
                >
                  <XCircle size={30} style={{ color: "#f87171" }} />
                </motion.div>

                <div className="text-center">
                  <p
                    className="text-sm font-medium mb-1"
                    style={{ color: "#f87171" }}
                  >
                    Unrecognized Person
                  </p>
                  <p
                    className="text-base"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    No matching gait profile found in the database
                  </p>
                </div>

                <div
                  className="w-full rounded-xl p-4 text-center"
                  style={{
                    background: "rgba(248,113,113,0.06)",
                    border: "1px solid rgba(248,113,113,0.2)",
                  }}
                >
                  <p
                    className="text-xs mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Best match confidence
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "#f87171",
                    }}
                  >
                    {result!.confidence.toFixed(1)}%
                  </p>
                  <p
                    className="text-xs mt-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Below recognition threshold (50%)
                  </p>
                </div>

                <button
                  onClick={reset}
                  className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--border-base)",
                    color: "var(--text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(249,115,22,0.3)";
                    (e.currentTarget as HTMLElement).style.color = "#fb923c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border-base)";
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--text-secondary)";
                  }}
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Info strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="rounded-xl p-4"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-base)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            <span
              className="font-semibold"
              style={{ color: "var(--text-secondary)" }}
            >
              How it works:
            </span>{" "}
            Upload a .zip containing a short walking video (5–10s). The AI
            extracts skeletal keypoints, computes a 128-dim gait embedding, and
            matches it against enrolled profiles using cosine similarity.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
