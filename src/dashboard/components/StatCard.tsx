import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  glowColor?: string;
  delay?: number;
}

export default function StatCard({ label, value, sub, icon: Icon, iconColor = '#fb923c', iconBg = 'rgba(249,115,22,0.12)', glowColor = 'rgba(249,115,22,0.12)', delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-2xl p-5 overflow-hidden group"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-base)',
        transition: 'border-color 0.25s, box-shadow 0.25s',
      }}
      whileHover={{ y: -2 }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(249,115,22,0.25)';
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${glowColor}`;
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-base)';
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* Top-edge glow on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(to right,transparent,${iconColor}80,transparent)` }}
      />

      <div className="flex items-start justify-between mb-4">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg, border: `1px solid ${iconColor}30`, boxShadow: `0 0 12px ${iconColor}20` }}
        >
          <Icon size={16} style={{ color: iconColor }} />
        </div>
      </div>

      <div
        className="text-3xl font-bold mb-1 leading-none"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
      >
        {value}
      </div>
      <div className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{label}</div>
      {sub && <div className="text-xs mt-1.5" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
    </motion.div>
  );
}
