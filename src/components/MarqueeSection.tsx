import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, LogOut, UserCheck, Clock } from 'lucide-react';
import { AnimatedHeadingInView } from './AnimatedText';

interface LogEntry { id:number; name:string; event:string; confidence:number; time:string; type:'match'|'unknown'|'exit'|'denied'; }

const logs: LogEntry[] = [
  { id:1,  name:'John Mitchell',  event:'Identified',    confidence:93, time:'09:41:12', type:'match'   },
  { id:2,  name:'Unknown Person', event:'Unrecognized',  confidence:41, time:'09:41:38', type:'unknown' },
  { id:3,  name:'Jane Doe',       event:'Exited Zone',   confidence:88, time:'09:42:05', type:'exit'    },
  { id:4,  name:'Sarah Kim',      event:'Identified',    confidence:96, time:'09:42:21', type:'match'   },
  { id:5,  name:'Unknown Person', event:'Access Denied', confidence:37, time:'09:42:44', type:'denied'  },
  { id:6,  name:'Alex Turner',    event:'Identified',    confidence:91, time:'09:43:02', type:'match'   },
  { id:7,  name:'Maria Lopez',    event:'Identified',    confidence:85, time:'09:43:19', type:'match'   },
  { id:8,  name:'Unknown Person', event:'Unrecognized',  confidence:29, time:'09:43:47', type:'unknown' },
  { id:9,  name:'David Chen',     event:'Exited Zone',   confidence:94, time:'09:44:03', type:'exit'    },
  { id:10, name:'Emma Wilson',    event:'Identified',    confidence:89, time:'09:44:31', type:'match'   },
];
const logs2: LogEntry[] = [
  { id:11, name:'Ryan Park',      event:'Identified',    confidence:92, time:'09:45:00', type:'match'   },
  { id:12, name:'Unknown Person', event:'Access Denied', confidence:22, time:'09:45:18', type:'denied'  },
  { id:13, name:'Lisa Huang',     event:'Identified',    confidence:97, time:'09:45:40', type:'match'   },
  { id:14, name:'Tom Bradley',    event:'Exited Zone',   confidence:86, time:'09:46:02', type:'exit'    },
  { id:15, name:'Unknown Person', event:'Unrecognized',  confidence:45, time:'09:46:25', type:'unknown' },
  { id:16, name:'Nina Patel',     event:'Identified',    confidence:90, time:'09:46:48', type:'match'   },
  { id:17, name:'Carlos Ruiz',    event:'Identified',    confidence:83, time:'09:47:12', type:'match'   },
  { id:18, name:'Unknown Person', event:'Access Denied', confidence:31, time:'09:47:35', type:'denied'  },
];

function getTypeStyles(type: LogEntry['type']) {
  switch(type) {
    case 'match':   return { icon:<CheckCircle2 size={12}/>, iconColor:'#fb923c', bg:'rgba(249,115,22,0.07)',  border:'rgba(249,115,22,0.2)'   };
    case 'unknown': return { icon:<AlertCircle  size={12}/>, iconColor:'#f87171', bg:'rgba(248,113,113,0.06)', border:'rgba(248,113,113,0.15)' };
    case 'exit':    return { icon:<LogOut       size={12}/>, iconColor:'#2dd4bf', bg:'rgba(45,212,191,0.06)',  border:'rgba(45,212,191,0.15)'  };
    case 'denied':  return { icon:<AlertCircle  size={12}/>, iconColor:'#fca5a5', bg:'rgba(248,113,113,0.06)', border:'rgba(248,113,113,0.15)' };
  }
}

function LogCard({ log }: { log:LogEntry }) {
  const styles = getTypeStyles(log.type);
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl mx-2 shrink-0 transition-all duration-200 hover:scale-[1.02]"
      style={{ background:styles.bg, border:`1px solid ${styles.border}`, minWidth:'240px' }}
    >
      <div style={{ color:styles.iconColor, filter:`drop-shadow(0 0 4px ${styles.iconColor}60)` }}>{styles.icon}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium truncate" style={{ color:'var(--text-primary)' }}>{log.name}</span>
          <span className="text-xs font-mono" style={{ color:log.confidence>70 ? '#fb923c' : '#f87171' }}>{log.confidence}%</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="text-xs" style={{ color:'var(--text-muted)' }}>{log.event}</span>
          <span style={{ color:'var(--text-dimmed)' }}>·</span>
          <Clock size={9} style={{ color:'var(--text-muted)' }} />
          <span className="text-xs font-mono" style={{ color:'var(--text-muted)' }}>{log.time}</span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse=false, delay=0 }: { items:LogEntry[]; reverse?:boolean; delay?:number }) {
  const doubled = [...items, ...items];
  return (
    <motion.div className="relative overflow-hidden"
      initial={{ opacity:0, x:reverse ? 60 : -60 }} whileInView={{ opacity:1, x:0 }}
      viewport={{ once:true, margin:'-40px' }}
      transition={{ duration:0.7, delay, ease:[0.16,1,0.3,1] }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background:'linear-gradient(to right,var(--bg-base),transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none" style={{ background:'linear-gradient(to left,var(--bg-base),transparent)' }} />
      <div className={`flex ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ width:'max-content' }}>
        {doubled.map((log,i) => <LogCard key={`${log.id}-${i}`} log={log} />)}
      </div>
    </motion.div>
  );
}

export default function MarqueeSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-glow-orb" style={{ width:600,height:400,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(ellipse,rgba(249,115,22,0.06),transparent 65%)' }} />

      <div className="max-w-6xl mx-auto px-6 mb-12">
        <div className="text-center">
          <motion.div
            initial={{ opacity:0, scale:0.9, filter:'blur(6px)' }} whileInView={{ opacity:1, scale:1, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 badge-glow"
            style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'var(--accent-mid)', boxShadow:'0 0 6px rgba(249,115,22,0.7)' }} />
            <UserCheck size={12} style={{ color:'var(--accent-mid)' }} />
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>Live Activity Feed</span>
          </motion.div>

          <AnimatedHeadingInView
            lines={[{ text:'System Running', className:'glow-heading' }]}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
            baseDelay={0.05} stagger={0.12}
          />

          <motion.p
            initial={{ opacity:0, y:10, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
            className="text-lg max-w-xl mx-auto" style={{ color:'var(--text-secondary)' }}
          >
            Real-time detection events flowing through the GaitAuth pipeline.
          </motion.p>
        </div>
      </div>

      <div className="space-y-4">
        <MarqueeRow items={logs}  delay={0.1} />
        <MarqueeRow items={logs2} reverse delay={0.22} />
      </div>
    </section>
  );
}
