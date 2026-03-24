import { motion } from 'framer-motion';
import { Activity, BarChart3, Eye, Lock, Zap } from 'lucide-react';
import { AnimatedHeadingInView } from './AnimatedText';

function ScanPreview() {
  return (
    <div className="relative w-full rounded-xl overflow-hidden mt-5"
      style={{ height:160, background:'rgba(0,0,0,0.5)', border:'1px solid rgba(249,115,22,0.15)' }}
    >
      <svg viewBox="0 0 200 110" className="w-full h-full" style={{ opacity:0.5 }}>
        <circle cx="100" cy="18" r="8" fill="none" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="100" y1="26" x2="100" y2="58" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="100" y1="38" x2="80"  y2="52" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="100" y1="38" x2="120" y2="52" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="100" y1="58" x2="88"  y2="82" stroke="#fb923c" strokeWidth="1.5" />
        <line x1="100" y1="58" x2="112" y2="82" stroke="#fb923c" strokeWidth="1.5" />
        <path d="M 30 95 Q 65 78 100 88 Q 135 98 170 80" fill="none" stroke="#f97316" strokeWidth="1.2" strokeDasharray="4,3" opacity="0.8" />
        {([[80,52],[120,52],[88,82],[112,82]] as [number,number][]).map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#f97316" opacity="0.9" />
        ))}
      </svg>
      <div className="absolute left-0 right-0 h-px scan-line" style={{ background:'linear-gradient(to right,transparent,rgba(249,115,22,0.9),transparent)' }} />
      <div className="absolute top-2 left-2  w-5 h-5 border-t-2 border-l-2 rounded-tl" style={{ borderColor:'rgba(249,115,22,0.5)' }} />
      <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 rounded-tr" style={{ borderColor:'rgba(249,115,22,0.5)' }} />
      <div className="absolute bottom-2 left-2  w-5 h-5 border-b-2 border-l-2 rounded-bl" style={{ borderColor:'rgba(249,115,22,0.5)' }} />
      <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 rounded-br" style={{ borderColor:'rgba(249,115,22,0.5)' }} />
      <div className="absolute top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-xs font-mono"
        style={{ background:'rgba(249,115,22,0.22)', color:'#fdba74', border:'1px solid rgba(249,115,22,0.35)' }}
      >SCANNING</div>
    </div>
  );
}

function LogPreview() {
  const logs = [
    { name:'John M.',  conf:93, ok:true  },
    { name:'Unknown',  conf:41, ok:false },
    { name:'Sarah K.', conf:89, ok:true  },
    { name:'Jane D.',  conf:88, ok:true  },
    { name:'Unknown',  conf:29, ok:false },
  ];
  return (
    <div className="mt-5 space-y-1.5">
      {logs.map((log,i) => (
        <motion.div key={i}
          initial={{ opacity:0, x:-12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          transition={{ duration:0.35, delay:i*0.07, ease:'easeOut' }}
          className="flex items-center justify-between px-3 py-2 rounded-lg"
          style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background:log.ok ? '#fb923c' : '#f87171', boxShadow:log.ok ? '0 0 6px rgba(249,115,22,0.6)' : '0 0 6px rgba(248,113,113,0.6)' }}
            />
            <span className="text-xs" style={{ color:'var(--text-secondary)' }}>{log.name}</span>
          </div>
          <span className="text-xs font-mono font-medium" style={{ color:log.conf>75 ? '#fb923c' : '#f87171' }}>{log.conf}%</span>
        </motion.div>
      ))}
    </div>
  );
}

function AIMatchPreview() {
  return (
    <div className="mt-5">
      <div className="rounded-xl p-4" style={{ background:'rgba(0,0,0,0.4)', border:'1px solid rgba(249,115,22,0.15)' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs" style={{ color:'var(--text-muted)' }}>Match Score</span>
          <span className="text-xs font-mono" style={{ color:'#fb923c', textShadow:'0 0 8px rgba(249,115,22,0.5)' }}>93.2%</span>
        </div>
        {[93,71,58,34].map((v,i) => (
          <div key={i} className="flex items-center gap-2 mb-2">
            <span className="text-xs w-14" style={{ color:'var(--text-muted)' }}>User {i+1}</span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background:'var(--border-base)' }}>
              <motion.div className="h-full rounded-full"
                initial={{ width:0 }} whileInView={{ width:`${v}%` }} viewport={{ once:true }}
                transition={{ duration:0.7, delay:0.2+i*0.1, ease:[0.16,1,0.3,1] }}
                style={{ background:i===0 ? 'linear-gradient(to right,#ea580c,#fb923c)' : 'rgba(255,255,255,0.12)', boxShadow:i===0 ? '0 0 8px rgba(249,115,22,0.4)' : 'none' }}
              />
            </div>
            <span className="text-xs font-mono w-8" style={{ color:'var(--text-muted)' }}>{v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SecurePreview() {
  return (
    <div className="mt-5 space-y-2">
      {[
        { label:'Liveness Detection',  status:'Active',  color:'#fb923c' },
        { label:'Replay Attack Guard', status:'Active',  color:'#fb923c' },
        { label:'Data Encryption',     status:'AES-256', color:'#2dd4bf' },
        { label:'Physical Contact',    status:'None',    color:'#e2e8f0' },
      ].map((item,i) => (
        <motion.div key={i}
          initial={{ opacity:0, x:12 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
          transition={{ duration:0.35, delay:i*0.07, ease:'easeOut' }}
          className="flex items-center justify-between px-3 py-2 rounded-lg"
          style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}
        >
          <span className="text-xs" style={{ color:'var(--text-secondary)' }}>{item.label}</span>
          <span className="text-xs font-mono font-medium" style={{ color:item.color }}>{item.status}</span>
        </motion.div>
      ))}
    </div>
  );
}

function AnalyticsPreview() {
  const bars   = [40,65,55,80,70,90,75,85,60,95,72,88];
  const months = ['J','F','M','A','M','J','J','A','S','O','N','D'];
  return (
    <div className="mt-5">
      <div className="rounded-xl p-4" style={{ background:'rgba(0,0,0,0.3)', border:'1px solid rgba(249,115,22,0.12)' }}>
        <div className="flex items-end gap-1.5 h-20 mb-2">
          {bars.map((h,i) => (
            <div key={i} className="flex-1 flex flex-col justify-end">
              <motion.div className="w-full rounded-sm"
                initial={{ height:0 }} whileInView={{ height:`${h}%` }} viewport={{ once:true }}
                transition={{ duration:0.5, delay:i*0.04, ease:[0.16,1,0.3,1] }}
                style={{ background:i===bars.length-1 ? 'linear-gradient(to top,#ea580c,#fb923c)' : 'rgba(249,115,22,0.22)', boxShadow:i===bars.length-1 ? '0 0 10px rgba(249,115,22,0.4)' : 'none' }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {months.map((m,i) => <span key={i} className="text-xs flex-1 text-center" style={{ color:'var(--text-dimmed)' }}>{m}</span>)}
        </div>
      </div>
    </div>
  );
}

const cards = [
  { id:1, icon:<Eye size={15}/>,       iconColor:'#fb923c', iconBg:'rgba(249,115,22,0.1)',  iconBorder:'rgba(249,115,22,0.25)',  title:'Real-time Gait Recognition', desc:'Identifies individuals frame-by-frame as they walk through the camera field of view using skeletal pose estimation and temporal analysis.', preview:<ScanPreview/>,     col:'md:col-span-1' },
  { id:2, icon:<Activity size={15}/>,  iconColor:'#2dd4bf', iconBg:'rgba(45,212,191,0.1)',  iconBorder:'rgba(45,212,191,0.22)',  title:'Live Detection Logs',        desc:'Every detection event is logged instantly with confidence scores, timestamps, and identity status.',                                    preview:<LogPreview/>,      col:'md:col-span-1' },
  { id:3, icon:<Zap size={15}/>,       iconColor:'#a78bfa', iconBg:'rgba(167,139,250,0.1)', iconBorder:'rgba(167,139,250,0.22)', title:'AI Matching System',         desc:'Deep neural network compares extracted gait embeddings against enrolled user profiles in under 200ms.',                                  preview:<AIMatchPreview/>,  col:'md:col-span-1' },
  { id:4, icon:<Lock size={15}/>,      iconColor:'#fbbf24', iconBg:'rgba(251,191,36,0.1)',  iconBorder:'rgba(251,191,36,0.22)',  title:'Secure & Contactless',       desc:'Zero physical interaction required. Liveness detection and AES-256 encryption ensure every authentication is tamper-proof.',              preview:<SecurePreview/>,   col:'md:col-span-1' },
  { id:5, icon:<BarChart3 size={15}/>, iconColor:'#fb923c', iconBg:'rgba(249,115,22,0.1)',  iconBorder:'rgba(249,115,22,0.22)',  title:'Analytics Dashboard',        desc:'Track detection rates, accuracy trends, and system performance over time with built-in analytics and exportable reports.',                preview:<AnalyticsPreview/>,col:'md:col-span-2' },
];

export default function BentoSection() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-glow-orb" style={{ width:700,height:700,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(circle,rgba(249,115,22,0.05),transparent 65%)' }} />

      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity:0, y:16, filter:'blur(6px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true, margin:'-60px' }} transition={{ duration:0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 badge-glow"
            style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
          >
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>Feature Showcase</span>
          </motion.div>

          <AnimatedHeadingInView
            lines={[{ text:'Everything You Need', className:'glow-heading' }]}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
            baseDelay={0.05} stagger={0.1}
          />

          <motion.p
            initial={{ opacity:0, y:12, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.35 }}
            className="text-lg max-w-xl mx-auto" style={{ color:'var(--text-secondary)' }}
          >
            A complete biometric authentication platform built for real-world deployment.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card,i) => (
            <motion.div
              key={card.id}
              initial={{ opacity:0, y:32, scale:0.97 }} whileInView={{ opacity:1, y:0, scale:1 }}
              viewport={{ once:true, margin:'-40px' }}
              transition={{ duration:0.55, delay:i*0.09, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-3, transition:{ duration:0.18 } }}
              className={`${card.col} group relative rounded-2xl p-6 cursor-default overflow-hidden flex flex-col card-hover-glow`}
              style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-hover)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-card)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-base)'; }}
            >
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background:`linear-gradient(to right,transparent,${card.iconColor}90,transparent)`, boxShadow:`0 0 8px ${card.iconColor}60` }}
              />
              <motion.div
                initial={{ opacity:0, scale:0.7 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                transition={{ duration:0.4, delay:i*0.09+0.15, ease:[0.16,1,0.3,1] }}
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 shrink-0"
                style={{ background:card.iconBg, border:`1px solid ${card.iconBorder}`, boxShadow:`0 0 12px ${card.iconBg}` }}
              >
                <span style={{ color:card.iconColor }}>{card.icon}</span>
              </motion.div>
              <h3 className="text-base font-semibold mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>{card.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{card.desc}</p>
              {card.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
