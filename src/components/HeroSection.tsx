import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

function SpotlightBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: '1000px', height: '700px',
          background: 'radial-gradient(ellipse at center top, rgba(249,115,22,0.18) 0%, rgba(234,88,12,0.07) 40%, transparent 70%)',
          filter: 'blur(2px)',
        }}
      />
      <div className="section-glow-orb" style={{ width:500, height:500, top:'10%', left:'-8%',  background:'radial-gradient(circle,rgba(249,115,22,0.1),transparent 70%)' }} />
      <div className="section-glow-orb" style={{ width:400, height:400, top:'15%', right:'-6%', background:'radial-gradient(circle,rgba(251,146,60,0.07),transparent 70%)' }} />
      <div className="absolute inset-0 grid-bg" style={{ maskImage:'radial-gradient(ellipse 85% 65% at 50% 0%,black,transparent)' }} />
    </div>
  );
}

function HeroTitle() {
  const line1 = ['Walk', 'In.'];
  const line2 = ['Get', 'Identified.'];
  const makeAnim = (i: number) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, delay: 0.25 + i * 0.13, ease: [0.16,1,0.3,1] as [number,number,number,number] },
  });
  return (
    <h1
      className="text-6xl md:text-8xl font-bold tracking-tight leading-none mb-6"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      <span className="block">
        {line1.map((w,i) => (
          <motion.span key={i}
            initial={{ opacity:0, y:32, filter:'blur(10px)' }}
            animate={makeAnim(i)}
            className="inline-block mr-[0.2em] glow-heading"
            style={{ color:'var(--text-primary)' }}
          >{w}</motion.span>
        ))}
      </span>
      <span className="block">
        {line2.map((w,i) => (
          <motion.span key={i}
            initial={{ opacity:0, y:32, filter:'blur(10px)' }}
            animate={makeAnim(line1.length + i)}
            className="inline-block mr-[0.2em] shimmer-text"
          >{w}</motion.span>
        ))}
      </span>
    </h1>
  );
}

export default function HeroSection() {
  const subWords = 'GaitAuth identifies individuals through their unique walking patterns using computer vision and deep learning — no cards, no PINs, no contact required.'.split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <SpotlightBg />
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity:0, y:16, scale:0.92, filter:'blur(8px)' }}
          animate={{ opacity:1, y:0,  scale:1,    filter:'blur(0px)' }}
          transition={{ duration:0.6, delay:0.05, ease:[0.16,1,0.3,1] }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-8 badge-glow"
          style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background:'var(--accent-mid)', boxShadow:'0 0 6px rgba(249,115,22,0.8)' }} />
          <span className="text-xs font-medium tracking-wide uppercase" style={{ color:'var(--accent-mid)' }}>
            AI-Powered Biometric Authentication
          </span>
        </motion.div>

        <HeroTitle />

        {/* Subtext */}
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color:'var(--text-secondary)' }}>
          {subWords.map((word, i) => (
            <motion.span key={i}
              initial={{ opacity:0, y:10, filter:'blur(4px)' }}
              animate={{ opacity:1, y:0,  filter:'blur(0px)' }}
              transition={{ duration:0.45, delay:0.9 + i*0.028, ease:'easeOut' }}
              className="inline-block mr-[0.28em]"
            >{word}</motion.span>
          ))}
        </p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial="hidden" animate="visible"
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.12, delayChildren:1.6 } } }}
        >
          <motion.div variants={{ hidden:{ opacity:0, y:16, filter:'blur(6px)' }, visible:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.5, ease:[0.16,1,0.3,1] as [number,number,number,number] } } }}>
            <button className="group flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold text-sm btn-glow"
              style={{ background:'linear-gradient(135deg,#f97316,#ea580c)' }}
            >
              Try Authentication
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
          <motion.div variants={{ hidden:{ opacity:0, y:16, filter:'blur(6px)' }, visible:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.5, ease:[0.16,1,0.3,1] as [number,number,number,number] } } }}>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200"
              style={{ background:'var(--bg-input)', border:'1px solid var(--border-input)', color:'var(--text-secondary)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-badge)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-badge)'; (e.currentTarget as HTMLElement).style.color='var(--text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-input)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-input)'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
            >
              <Play size={13} className="fill-current" />
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
          initial="hidden" animate="visible"
          variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.15, delayChildren:2.0 } } }}
        >
          {[
            { value:'97.3%',  label:'Recognition Accuracy' },
            { value:'<200ms', label:'Identification Speed'  },
            { value:'0',      label:'Physical Contact'      },
          ].map((stat, i) => (
            <motion.div key={i}
              variants={{ hidden:{ opacity:0, y:20, scale:0.88, filter:'blur(6px)' }, visible:{ opacity:1, y:0, scale:1, filter:'blur(0px)', transition:{ duration:0.55, ease:[0.16,1,0.3,1] as [number,number,number,number] } } }}
              className="text-center"
            >
              <div className="text-2xl font-bold mb-1 stat-glow" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>{stat.value}</div>
              <div className="text-xs uppercase tracking-wider" style={{ color:'var(--text-muted)' }}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background:'linear-gradient(to bottom,transparent,var(--bg-base))' }} />
    </section>
  );
}
