import { motion } from 'framer-motion';
import { ArrowRight, Footprints } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedHeadingInView } from './AnimatedText';

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="section-glow-orb" style={{ width:800,height:800,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(circle,rgba(249,115,22,0.1),transparent 60%)' }} />
      <div className="section-glow-orb" style={{ width:400,height:400,top:'30%',left:'30%',background:'radial-gradient(circle,rgba(234,88,12,0.07),transparent 70%)' }} />
      <div className="section-glow-orb" style={{ width:300,height:300,top:'40%',right:'25%',background:'radial-gradient(circle,rgba(251,146,60,0.06),transparent 70%)' }} />
      <div className="absolute inset-0 grid-bg" style={{ maskImage:'radial-gradient(ellipse 70% 70% at 50% 50%,black,transparent)' }} />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity:0, scale:0.93 }} whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}
        >
          {/* Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity:0, y:-20, scale:0.7 }} whileInView={{ opacity:1, y:0, scale:1 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.05, ease:[0.34,1.56,0.64,1] }}
          >
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{
              background:'linear-gradient(135deg,rgba(249,115,22,0.35),rgba(234,88,12,0.2))',
              border:'1px solid rgba(251,146,60,0.5)',
              boxShadow:'0 0 40px rgba(249,115,22,0.35),0 0 80px rgba(249,115,22,0.15)',
            }}>
              <img src="/favicon.svg" alt="" />
              {/* <Footprints size={28} style={{ color:'#fdba74', filter:'drop-shadow(0 0 6px rgba(249,115,22,0.7))' }} /> */}
            </div>
          </motion.div>

          <AnimatedHeadingInView
            lines={[
              { text:'Try the System', className:'glow-heading' },
              { text:'Yourself',       className:'cta-dim'      },
            ]}
            className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
            baseDelay={0.15} stagger={0.1}
          />

          <motion.p
            initial={{ opacity:0, y:12, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.5 }}
            className="text-lg mb-10 max-w-xl mx-auto leading-relaxed" style={{ color:'var(--text-secondary)' }}
          >
            Upload a walking video and see GaitAuth identify the subject in real-time.
            No account required for the demo.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial="hidden" whileInView="visible" viewport={{ once:true }}
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:0.14, delayChildren:0.6 } } }}
          >
            <motion.div variants={{ hidden:{ opacity:0, y:16, filter:'blur(6px)' }, visible:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.45, ease:[0.16,1,0.3,1] as [number,number,number,number] } } }}>
              <Link to="/dashboard/authenticate">
                <motion.button
                  whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }}
                  className="group flex items-center gap-2.5 px-8 py-4 rounded-xl text-white font-bold text-base btn-glow"
                  style={{ background:'linear-gradient(135deg,#f97316,#ea580c)', fontFamily:'var(--font-display)' }}
                >
                  Start Authentication
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </Link>
            </motion.div>

            <motion.div variants={{ hidden:{ opacity:0, y:16, filter:'blur(6px)' }, visible:{ opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.45, ease:[0.16,1,0.3,1] as [number,number,number,number] } } }}>
              <button
                className="px-8 py-4 rounded-xl text-base font-medium transition-all duration-200"
                style={{ background:'var(--bg-input)', border:'1px solid var(--border-input)', color:'var(--text-secondary)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-badge)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-badge)'; (e.currentTarget as HTMLElement).style.color='var(--text-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-input)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-input)'; (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
              >
                View Documentation
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
