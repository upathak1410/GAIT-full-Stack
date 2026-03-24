import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Activity, CheckCircle2, AlertCircle, Cpu, Users, ShieldCheck } from 'lucide-react';

function DashboardUI() {
  const events = [
    { name:'John Mitchell',  conf:93, ok:true,  time:'09:41' },
    { name:'Unknown Person', conf:38, ok:false, time:'09:42' },
    { name:'Sarah Kim',      conf:96, ok:true,  time:'09:43' },
    { name:'Alex Turner',    conf:91, ok:true,  time:'09:44' },
    { name:'Unknown Person', conf:27, ok:false, time:'09:45' },
  ];
  return (
    <div className="w-full h-full flex flex-col" style={{ background:'var(--bg-elevated)', fontFamily:'Inter,sans-serif' }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 shrink-0" style={{ borderBottom:'1px solid var(--border-base)' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', boxShadow:'0 0 10px rgba(249,115,22,0.35)' }}>
            <ShieldCheck size={12} className="text-white" />
          </div>
          <span className="text-xs font-semibold" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>GaitAuth Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#fb923c', boxShadow:'0 0 5px rgba(249,115,22,0.7)' }} />
          <span className="text-xs" style={{ color:'#fb923c' }}>Live</span>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 px-4 py-3 shrink-0">
        {[
          { label:'Identified', value:'142', icon:<Users size={11}/>,       color:'#fb923c' },
          { label:'Unknown',    value:'17',  icon:<AlertCircle size={11}/>, color:'#f87171' },
          { label:'Accuracy',   value:'97%', icon:<Cpu size={11}/>,         color:'#2dd4bf' },
        ].map((s,i) => (
          <div key={i} className="rounded-lg px-3 py-2" style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}>
            <div className="flex items-center gap-1 mb-1" style={{ color:s.color }}>
              {s.icon}
              <span className="text-xs" style={{ color:'var(--text-muted)' }}>{s.label}</span>
            </div>
            <span className="text-sm font-bold" style={{ color:'var(--text-primary)' }}>{s.value}</span>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="px-4 pb-3 shrink-0">
        <div className="rounded-lg p-3" style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}>
          <div className="flex items-center gap-1.5 mb-2">
            <Activity size={11} style={{ color:'#fb923c' }} />
            <span className="text-xs" style={{ color:'var(--text-muted)' }}>Detections / hour</span>
          </div>
          <div className="flex items-end gap-0.5 h-12">
            {[30,55,40,70,60,85,75,90,65,80,72,88,95,78,84].map((h,i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, background:i>=12 ? 'linear-gradient(to top,#ea580c,#fb923c)' : 'rgba(249,115,22,0.22)' }} />
            ))}
          </div>
        </div>
      </div>
      {/* Live log */}
      <div className="flex-1 overflow-hidden px-4 pb-4">
        <div className="h-full rounded-lg overflow-hidden" style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}>
          <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom:'1px solid var(--border-base)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'#fb923c' }} />
            <span className="text-xs" style={{ color:'var(--text-muted)' }}>Live Detection Feed</span>
          </div>
          <div className="divide-y" style={{ borderColor:'var(--border-base)' }}>
            {events.map((e,i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {e.ok
                    ? <CheckCircle2 size={11} style={{ color:'#fb923c' }} className="shrink-0" />
                    : <AlertCircle  size={11} className="text-red-400 shrink-0" />}
                  <span className="text-xs truncate" style={{ maxWidth:140, color:'var(--text-secondary)' }}>{e.name}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono" style={{ color:e.conf>70 ? '#fb923c' : '#f87171' }}>{e.conf}%</span>
                  <span className="text-xs font-mono" style={{ color:'var(--text-muted)' }}>{e.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContainerScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target:containerRef, offset:['start end','center center'] });
  const smooth      = useSpring(scrollYProgress, { stiffness:60, damping:18, restDelta:0.001 });
  const rotateX     = useTransform(smooth, [0,1], [32,0]);
  const rotateY     = useTransform(smooth, [0,1], [28,0]);
  const scale       = useTransform(smooth, [0,1], [0.80,1]);
  const opacity     = useTransform(smooth, [0,0.25], [0,1]);
  const y           = useTransform(smooth, [0,1], [80,0]);
  const glowOpacity = useTransform(smooth, [0,0.8], [0.6,0]);

  return (
    <section ref={containerRef} className="relative py-28 overflow-hidden" style={{ perspective:'1400px', perspectiveOrigin:'50% 40%' }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 80% 55% at 50% 30%,rgba(249,115,22,0.07),transparent)' }} />

      <motion.div
        initial={{ opacity:0, y:24, filter:'blur(10px)' }}
        whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
        viewport={{ once:true }}
        transition={{ duration:0.7 }}
        className="text-center mb-16 px-6"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 badge-glow"
          style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
        >
          <ShieldCheck size={12} style={{ color:'var(--accent-mid)' }} />
          <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>Live System Preview</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-heading" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>
          See It In Action
        </h2>
        <p className="text-lg max-w-lg mx-auto" style={{ color:'var(--text-secondary)' }}>
          A real-time dashboard showing gait detections, confidence scores, and live activity — all in one place.
        </p>
      </motion.div>

      <div className="flex justify-center px-4" style={{ transformStyle:'preserve-3d' }}>
        <motion.div
          style={{ rotateX, rotateY, scale, opacity, y, transformOrigin:'center center', transformStyle:'preserve-3d' }}
          className="w-full max-w-4xl"
        >
          {/* Left-edge rotation glow */}
          <motion.div
            className="absolute inset-y-0 left-0 w-24 rounded-l-2xl pointer-events-none z-10"
            style={{ opacity:glowOpacity, background:'linear-gradient(to right,rgba(249,115,22,0.28),transparent)', filter:'blur(8px)' }}
          />

          {/* Frame */}
          <div className="relative rounded-2xl p-px" style={{
            background:'linear-gradient(135deg,rgba(249,115,22,0.55) 0%,rgba(255,255,255,0.06) 50%,rgba(234,88,12,0.45) 100%)',
            boxShadow:'0 0 0 1px rgba(249,115,22,0.1),0 50px 100px rgba(0,0,0,0.55),0 0 80px rgba(249,115,22,0.1)',
          }}>
            <div className="rounded-2xl overflow-hidden" style={{ background:'var(--bg-elevated)' }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background:'var(--bg-surface)', borderBottom:'1px solid var(--border-base)' }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background:'#ff5f57' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background:'#febc2e' }} />
                  <div className="w-3 h-3 rounded-full" style={{ background:'#28c840' }} />
                </div>
                <div className="flex-1 mx-4 px-3 py-1 rounded-md text-xs text-center" style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)', color:'var(--text-muted)' }}>
                  gaitauth.app/dashboard
                </div>
              </div>
              <div style={{ height:480 }}><DashboardUI /></div>
            </div>
          </div>

          {/* Ground shadow */}
          <div className="absolute left-12 right-12 bottom-0 h-20 pointer-events-none" style={{ background:'radial-gradient(ellipse,rgba(249,115,22,0.18) 0%,transparent 70%)', filter:'blur(16px)', transform:'translateY(90%) scaleY(0.35)' }} />
        </motion.div>
      </div>
    </section>
  );
}
