import { motion } from 'framer-motion';
import { Fingerprint, Lock, Zap } from 'lucide-react';
import { useState } from 'react';
import { AnimatedHeadingInView } from './AnimatedText';

interface GradientCardProps {
  icon: React.ReactNode; title: string; description: string;
  detail: string; gradient: string; glowColor: string; delay: number;
}

function GradientCard({ icon, title, description, detail, gradient, glowColor, delay }: GradientCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity:0, y:36, scale:0.96 }} whileInView={{ opacity:1, y:0, scale:1 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:0.65, delay, ease:[0.16,1,0.3,1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="relative rounded-2xl p-px cursor-default overflow-hidden"
      style={{
        background: hovered
          ? `linear-gradient(135deg,${glowColor}55,var(--border-base),${glowColor}28)`
          : 'linear-gradient(135deg,var(--border-base),transparent)',
        boxShadow: hovered ? `0 0 40px ${glowColor}20,0 0 80px ${glowColor}08` : 'none',
        transition: 'background 0.4s ease,box-shadow 0.4s ease',
      }}
    >
      <motion.div
        animate={{ y:hovered ? -4 : 0 }} transition={{ duration:0.3, ease:'easeOut' }}
        className="relative rounded-2xl p-7 h-full"
        style={{
          background: hovered ? `radial-gradient(ellipse at top left,${glowColor}12,var(--bg-elevated) 60%)` : 'var(--bg-elevated)',
          transition: 'background 0.4s ease',
        }}
      >
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none"
          style={{ background:`radial-gradient(circle,${glowColor}14,transparent 70%)`, opacity:hovered ? 1 : 0, transition:'opacity 0.4s ease' }}
        />

        <motion.div
          initial={{ opacity:0, scale:0.6 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
          transition={{ duration:0.45, delay:delay+0.1, ease:[0.16,1,0.3,1] }}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
          style={{
            background: gradient,
            boxShadow: hovered ? `0 0 30px ${glowColor}40,0 0 60px ${glowColor}18` : `0 0 15px ${glowColor}20`,
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <div className="text-white" style={{ filter:`drop-shadow(0 0 4px ${glowColor}80)` }}>{icon}</div>
        </motion.div>

        <motion.h3
          initial={{ opacity:0, y:10, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }} viewport={{ once:true }}
          transition={{ duration:0.4, delay:delay+0.18 }}
          className="text-xl font-bold mb-3"
          style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)', textShadow:hovered ? `0 0 20px ${glowColor}40` : 'none', transition:'text-shadow 0.3s ease' }}
        >{title}</motion.h3>

        <motion.p
          initial={{ opacity:0, y:8, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }} viewport={{ once:true }}
          transition={{ duration:0.4, delay:delay+0.26 }}
          className="text-sm leading-relaxed mb-6" style={{ color:'var(--text-secondary)' }}
        >{description}</motion.p>

        <motion.div
          initial={{ opacity:0, y:6 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:0.35, delay:delay+0.34 }}
          className="px-3 py-2 rounded-lg inline-flex items-center gap-2"
          style={{ background:`${glowColor}10`, border:`1px solid ${glowColor}28`, boxShadow:`0 0 10px ${glowColor}12` }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background:glowColor, boxShadow:`0 0 5px ${glowColor}` }} />
          <span className="text-xs font-medium" style={{ color:glowColor }}>{detail}</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function FeatureCards() {
  const cards = [
    {
      icon: <Fingerprint size={22}/>,
      title: 'Contactless',
      description: 'Authentication happens passively as individuals walk naturally through the monitored area. No badges, no PINs, no biometric scanners to touch.',
      detail: 'Zero physical interaction required',
      gradient: 'linear-gradient(135deg,#ea580c,#f97316)',
      glowColor: '#fb923c',
      delay: 0,
    },
    {
      icon: <Lock size={22}/>,
      title: 'Secure',
      description: 'Gait patterns are nearly impossible to forge or replay. The AI model uses multi-frame temporal analysis, making spoofing attacks highly impractical.',
      detail: 'Liveness detection built-in',
      gradient: 'linear-gradient(135deg,#7c3aed,#a78bfa)',
      glowColor: '#a78bfa',
      delay: 0.12,
    },
    {
      icon: <Zap size={22}/>,
      title: 'Real-time',
      description: 'Sub-200ms identification latency from video frame capture to identity result. Optimized inference pipeline runs on standard GPU hardware.',
      detail: '<200ms end-to-end latency',
      gradient: 'linear-gradient(135deg,#0d9488,#2dd4bf)',
      glowColor: '#2dd4bf',
      delay: 0.24,
    },
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-glow-orb" style={{ width:700,height:500,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(ellipse,rgba(249,115,22,0.05),transparent 65%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity:0, y:14, filter:'blur(6px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 badge-glow"
            style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
          >
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>Core Principles</span>
          </motion.div>

          <AnimatedHeadingInView
            lines={[{ text:'Built Different', className:'glow-heading' }]}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
            baseDelay={0.05} stagger={0.12}
          />

          <motion.p
            initial={{ opacity:0, y:10, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
            className="text-lg max-w-xl mx-auto" style={{ color:'var(--text-secondary)' }}
          >
            Three pillars that define GaitAuth’s approach to biometric security.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card,i) => <GradientCard key={i} {...card} />)}
        </div>
      </div>
    </section>
  );
}
