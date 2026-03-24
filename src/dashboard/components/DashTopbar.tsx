import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, ArrowLeft } from 'lucide-react';

const TITLES: Record<string, { title: string; sub: string }> = {
  '/dashboard':              { title: 'Overview',      sub: 'System summary and recent activity' },
  '/dashboard/live':         { title: 'Live Activity', sub: 'Real-time detection feed'           },
  '/dashboard/analytics':    { title: 'Analytics',     sub: 'Performance metrics and trends'    },
  '/dashboard/logs':         { title: 'Logs',          sub: 'Full detection history'             },
  '/dashboard/authenticate': { title: 'Authenticate',  sub: 'Upload gait sample for verification' },
};

export default function DashTopbar() {
  const { pathname } = useLocation();
  const meta = TITLES[pathname] ?? { title: 'Dashboard', sub: '' };

  return (
    <header
      className="fixed top-0 left-56 right-0 h-16 flex items-center justify-between px-6 z-30"
      style={{
        background: 'var(--bg-nav)',
        borderBottom: '1px solid var(--border-base)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
        animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <h1
          className="text-base font-bold leading-none mb-0.5"
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
        >
          {meta.title}
        </h1>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{meta.sub}</p>
      </motion.div>

      <div className="flex items-center gap-3">
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 6px rgba(52,211,153,0.7)' }} />
          <span className="text-xs font-medium" style={{ color: '#34d399' }}>Live</span>
        </div>

        {/* Bell */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-muted)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-badge)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-mid)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-base)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
        >
          <Bell size={14} />
        </button>

        {/* Back to landing */}
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-base)', color: 'var(--text-secondary)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-badge)'; (e.currentTarget as HTMLElement).style.color = 'var(--accent-light)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-base)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'; }}
        >
          <ArrowLeft size={12} />
          Landing
        </Link>
      </div>
    </header>
  );
}
