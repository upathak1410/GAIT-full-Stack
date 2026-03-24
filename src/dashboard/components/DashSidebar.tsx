import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  ScrollText,
  Fingerprint,
  Footprints,
} from "lucide-react";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { to: "/dashboard/live", icon: Activity, label: "Live Activity" },
  { to: "/dashboard/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/dashboard/logs", icon: ScrollText, label: "Logs" },
  { to: "/dashboard/authenticate", icon: Fingerprint, label: "Authenticate" },
];

export default function DashSidebar() {
  return (
    <aside
      className="fixed left-0 top-0 h-full w-56 flex flex-col z-40"
      style={{
        background: "var(--bg-surface)",
        borderRight: "1px solid var(--border-base)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2.5 px-5 h-16 shrink-0"
        style={{ borderBottom: "1px solid var(--border-base)" }}
      >
        <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
          <img src="/favicon.svg" alt="" />
          {/* <Footprints size={14} className="text-white" /> */}
        </div>
        <span
          className="font-black text-lg tracking-wide"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--text-primary)",
          }}
        >
          GaitAuth
        </span>
      </div>

      {/* Label */}
      <div className="px-5 pt-6 pb-2">
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          Navigation
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 space-y-0.5">
        {NAV.map(({ to, icon: Icon, label }, i) => (
          <motion.div
            key={to}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06, ease: "easeOut" }}
          >
            <NavLink
              to={to}
              end={to === "/dashboard"}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group"
              style={({ isActive }) => ({
                background: isActive ? "rgba(249,115,22,0.12)" : "transparent",
                border: isActive
                  ? "1px solid rgba(249,115,22,0.25)"
                  : "1px solid transparent",
                color: isActive ? "#fb923c" : "var(--text-nav-link)",
                boxShadow: isActive ? "0 0 16px rgba(249,115,22,0.08)" : "none",
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={16}
                    style={{
                      color: isActive ? "#fb923c" : "var(--text-muted)",
                      transition: "color 0.2s",
                    }}
                  />
                  {label}
                </>
              )}
            </NavLink>
          </motion.div>
        ))}
      </nav>

      {/* Footer */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid var(--border-base)" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 6px rgba(52,211,153,0.8)" }}
          />
          <span className="text-xs" style={{ color: "var(--text-muted)" }}>
            System Active
          </span>
        </div>
      </div>
    </aside>
  );
}
