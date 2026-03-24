import { motion } from "framer-motion";

import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        background: "var(--bg-nav)",
        borderBottom: "1px solid var(--border-nav)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-12 h-12  flex items-center justify-center rounded-full">
            {/* <Footprints size={16} className="text-white" /> */}
            <img src="/favicon.svg" alt="" />
          </div>
          <span
            className="font-black text-2xl tracking-wider"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--text-primary)",
            }}
          >
            Gait X
          </span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-2">
          
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm font-medium rounded-md transition-all duration-200"
            style={{
              color: "var(--text-primary)",
              background: "var(--bg-badge)",
              border: "1px solid var(--border-badge)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(249,115,22,0.22)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "var(--bg-badge)";
            }}
          >
            Dashboard
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
