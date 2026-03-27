import { motion } from 'framer-motion';
import { Footprints, Github } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      className="relative py-10"
      style={{ borderTop:'1px solid var(--border-base)' }}
      initial={{ opacity:0, filter:'blur(4px)' }}
      whileInView={{ opacity:1, filter:'blur(0px)' }}
      viewport={{ once:true }}
      transition={{ duration:0.6 }}
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center">
            {/* <Footprints size={13} className="text-white" /> */}
            <img src="/favicon.svg" alt="" />
          </div>
          <span className="font-semibold text-base" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>GaitStride</span>
        </div>
        <p className="text-sm text-center" style={{ color:'var(--text-muted)' }}>
          © GaitStride — Project · Biometric Authentication using Gait Recognition
        </p>
        <a href="#" className="flex items-center gap-2 text-sm transition-colors duration-200"
          style={{ color:'var(--text-muted)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color='var(--text-secondary)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color='var(--text-muted)'; }}
        >
          <Github size={15} /><span>Source</span>
        </a>
      </div>
    </motion.footer>
  );
}
