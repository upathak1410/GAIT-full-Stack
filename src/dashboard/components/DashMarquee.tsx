import type { EntryLog } from '../data/mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

function Chip({ log }: { log: EntryLog }) {
  const ok = log.recognized;
  return (
    <div
      className="inline-flex items-center gap-2 px-3 py-2 rounded-xl mx-2 shrink-0 text-xs font-medium"
      style={{
        background: ok ? 'rgba(52,211,153,0.07)' : 'rgba(248,113,113,0.07)',
        border: `1px solid ${ok ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)'}`,
        minWidth: '200px',
      }}
    >
      <span style={{ color: ok ? '#34d399' : '#f87171', filter: `drop-shadow(0 0 4px ${ok ? 'rgba(52,211,153,0.5)' : 'rgba(248,113,113,0.5)'})` }}>
        {ok ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
      </span>
      <span style={{ color: 'var(--text-primary)' }}>{log.name ?? 'Unknown'}</span>
      <span style={{ color: 'var(--text-muted)' }}>•</span>
      <span className="font-mono" style={{ color: ok ? '#34d399' : '#f87171' }}>{log.confidence.toFixed(0)}%</span>
    </div>
  );
}

export default function DashMarquee({ logs }: { logs: EntryLog[] }) {
  const doubled = [...logs, ...logs];
  return (
    <div
      className="relative overflow-hidden rounded-xl py-3"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-base)' }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right,var(--bg-surface),transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left,var(--bg-surface),transparent)' }} />

      {/* Header pill */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-base)' }}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" style={{ boxShadow: '0 0 5px rgba(52,211,153,0.7)' }} />
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>Live Feed</span>
      </div>

      <div className="flex animate-marquee pt-6" style={{ width: 'max-content' }}>
        {doubled.map((log, i) => <Chip key={`${log.id}-${i}`} log={log} />)}
      </div>
    </div>
  );
}
