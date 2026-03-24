import { motion } from 'framer-motion';
import { Camera, Cpu, Database, Shield, Activity, Lock } from 'lucide-react';
import { AnimatedHeadingInView } from './AnimatedText';

interface OrbitItemProps {
  icon: React.ReactNode; label: string; startAngle: number; radius: number;
  color: string; duration: number; reverse?: boolean; canvasSize: number;
}

function OrbitItem({ icon, label, startAngle, radius, color, duration, reverse = false, canvasSize }: OrbitItemProps) {
  const half = canvasSize / 2;
  const cssStart = startAngle - 90;
  const cssEnd   = reverse ? cssStart - 360 : cssStart + 360;
  return (
    <motion.div className="absolute" style={{ width:0, height:0, top:half, left:half }}
      animate={{ rotate:[cssStart, cssEnd] }}
      transition={{ duration, repeat:Infinity, ease:'linear' }}
    >
      <motion.div
        className="absolute flex flex-col items-center gap-1.5"
        style={{ top:0, left:radius, transform:'translate(-50%,-50%)' }}
        animate={{ rotate:[-cssStart, -cssEnd] }}
        transition={{ duration, repeat:Infinity, ease:'linear' }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          style={{
            background:`rgba(${color},0.12)`,
            border:`1px solid rgba(${color},0.35)`,
            boxShadow:`0 0 20px rgba(${color},0.2), 0 0 40px rgba(${color},0.08)`,
          }}
        >
          <div style={{ color:`rgb(${color})` }}>{icon}</div>
        </div>
        <span className="text-xs font-medium whitespace-nowrap" style={{ color:`rgba(${color},0.85)` }}>{label}</span>
      </motion.div>
    </motion.div>
  );
}

function OrbitRing({ radius, canvasSize, color='255,255,255', duration, reverse=false }: { radius:number; canvasSize:number; color?:string; duration:number; reverse?:boolean }) {
  const size = radius * 2, half = canvasSize / 2;
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{ width:size, height:size, top:half-radius, left:half-radius, border:`1px dashed rgba(${color},0.2)` }}
      animate={{ rotate: reverse ? [0,-360] : [0,360] }}
      transition={{ duration, repeat:Infinity, ease:'linear' }}
    />
  );
}

export default function OrbitSection() {
  const CANVAS=480, INNER_R=130, INNER_DUR=18, OUTER_R=210, OUTER_DUR=28;

  // Inner ring: orange accent + complementary colors
  const innerItems = [
    { icon:<Camera   size={16}/>, label:'Camera',    startAngle:0,   color:'249,115,22'  }, // orange
    { icon:<Cpu      size={16}/>, label:'AI Engine', startAngle:90,  color:'167,139,250' }, // violet
    { icon:<Database size={16}/>, label:'Storage',   startAngle:180, color:'45,212,191'  }, // teal
    { icon:<Shield   size={16}/>, label:'Security',  startAngle:270, color:'251,191,36'  }, // amber
  ];
  // Outer ring
  const outerItems = [
    { icon:<Activity size={14}/>, label:'Live Feed', startAngle:45,  color:'251,146,60'  }, // orange-light
    { icon:<Lock     size={14}/>, label:'Encrypt',   startAngle:225, color:'52,211,153'  }, // emerald
  ];

  const pipelineSteps = [
    { step:'01', label:'Video capture via CCTV or webcam',       color:'#fb923c' },
    { step:'02', label:'Pose estimation extracts gait features',  color:'#a78bfa' },
    { step:'03', label:'AI model matches against enrolled users', color:'#2dd4bf' },
    { step:'04', label:'Result logged with confidence score',     color:'#fbbf24' },
  ];

  return (
    <section className="relative py-28 overflow-hidden">
      <div className="section-glow-orb" style={{ width:600,height:600,top:'50%',right:'-10%',transform:'translateY(-50%)',background:'radial-gradient(circle,rgba(249,115,22,0.07),transparent 70%)' }} />
      <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" style={{ background:'linear-gradient(to bottom,var(--bg-base),transparent)' }} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:'-100px' }}
            transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
          >
            <motion.div
              initial={{ opacity:0, y:12, filter:'blur(6px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
              viewport={{ once:true }} transition={{ duration:0.45 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6 badge-glow"
              style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
            >
              <Cpu size={12} style={{ color:'var(--accent-mid)' }} />
              <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>System Architecture</span>
            </motion.div>

            <AnimatedHeadingInView
              lines={[
                { text:'End-to-End',    className:'glow-heading' },
                { text:'Gait Pipeline', className:'' },
              ]}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
              style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
              baseDelay={0.1} stagger={0.1}
            />

            <motion.p
              initial={{ opacity:0, y:10, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
              viewport={{ once:true }} transition={{ duration:0.5, delay:0.4 }}
              className="text-base leading-relaxed mb-8" style={{ color:'var(--text-secondary)' }}
            >
              From camera input to secure identity verification, every step in the GaitAuth pipeline
              is optimized for accuracy and speed. The system processes skeletal keypoints in real-time
              using a custom-trained deep learning model.
            </motion.p>

            <motion.div
              className="space-y-3" initial="hidden" whileInView="visible"
              viewport={{ once:true, margin:'-60px' }}
              variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.1, delayChildren:0.5 } } }}
            >
              {pipelineSteps.map(item => (
                <motion.div
                  key={item.step}
                  variants={{ hidden:{ opacity:0, x:-16 }, visible:{ opacity:1, x:0, transition:{ duration:0.4, ease:'easeOut' } } }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-mono font-bold" style={{ color:item.color }}>{item.step}</span>
                  <span className="text-sm" style={{ color:'var(--text-secondary)' }}>{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Orbit */}
          <motion.div
            initial={{ opacity:0, scale:0.88 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true, margin:'-100px' }}
            transition={{ duration:1.1, ease:[0.16,1,0.3,1] }}
            className="flex items-center justify-center"
          >
            <div className="relative" style={{ width:CANVAS, height:CANVAS }}>
              <OrbitRing radius={INNER_R} canvasSize={CANVAS} color="249,115,22" duration={INNER_DUR} />
              <OrbitRing radius={OUTER_R} canvasSize={CANVAS} color="234,88,12"  duration={OUTER_DUR} reverse />

              {[0,1].map(i => (
                <div key={i} className="absolute rounded-full animate-pulse-ring pointer-events-none"
                  style={{ width:96,height:96,top:CANVAS/2-48,left:CANVAS/2-48,background:'rgba(249,115,22,0.16)',animationDelay:`${i}s` }}
                />
              ))}

              {/* Center node */}
              <div
                className="absolute z-10 flex flex-col items-center justify-center rounded-2xl orbit-center-glow"
                style={{
                  width:80,height:80,top:CANVAS/2-40,left:CANVAS/2-40,
                  background:'linear-gradient(135deg,rgba(249,115,22,0.35),rgba(234,88,12,0.22))',
                  border:'1px solid rgba(251,146,60,0.5)',
                }}
              >
                <span className="text-xs font-bold" style={{ fontFamily:'var(--font-display)',color:'#fdba74',textShadow:'0 0 10px rgba(249,115,22,0.7)' }}>Gait</span>
                <span className="text-xs font-bold" style={{ fontFamily:'var(--font-display)',color:'var(--text-primary)',textShadow:'0 0 8px rgba(255,255,255,0.4)' }}>AI</span>
              </div>

              {innerItems.map((item,i) => <OrbitItem key={i}       {...item} radius={INNER_R} duration={INNER_DUR} canvasSize={CANVAS} />)}
              {outerItems.map((item,i) => <OrbitItem key={`o${i}`} {...item} radius={OUTER_R} duration={OUTER_DUR} reverse canvasSize={CANVAS} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
