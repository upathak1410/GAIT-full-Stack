import { motion } from 'framer-motion';
import { Upload, Brain, UserCheck, Database } from 'lucide-react';
import { AnimatedHeadingInView } from './AnimatedText';

const steps = [
  {
    number:'01', icon:<Upload    size={20}/>, title:'Upload Gait Sample',
    description:'Submit a short video clip (5–10 seconds) of the subject walking. The system accepts standard camera feeds, CCTV footage, or webcam input.',
    color:'#fb923c', bg:'rgba(249,115,22,0.1)',   border:'rgba(249,115,22,0.25)',
  },
  {
    number:'02', icon:<Brain     size={20}/>, title:'AI Processes Walking Pattern',
    description:'The deep learning model extracts 17 skeletal keypoints per frame, analyzes temporal stride sequences, and generates a unique 128-dimensional gait embedding.',
    color:'#a78bfa', bg:'rgba(167,139,250,0.1)',  border:'rgba(167,139,250,0.25)',
  },
  {
    number:'03', icon:<UserCheck size={20}/>, title:'System Matches Identity',
    description:'The gait embedding is compared against enrolled profiles using cosine similarity. If the match score exceeds the threshold, identity is confirmed.',
    color:'#2dd4bf', bg:'rgba(45,212,191,0.1)',   border:'rgba(45,212,191,0.25)',
  },
  {
    number:'04', icon:<Database  size={20}/>, title:'Result Logged in Database',
    description:'Every authentication event — successful or not — is recorded with confidence score, timestamp, camera ID, and anonymized gait hash for audit trails.',
    color:'#fbbf24', bg:'rgba(251,191,36,0.1)',   border:'rgba(251,191,36,0.25)',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="section-glow-orb" style={{ width:500,height:800,top:'50%',left:'50%',transform:'translate(-50%,-50%)',background:'radial-gradient(ellipse,rgba(249,115,22,0.04),transparent 65%)' }} />

      {/* Vertical connector */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px hidden lg:block"
        style={{ top:'11rem',bottom:'8rem',background:'linear-gradient(to bottom,transparent,rgba(249,115,22,0.25) 10%,rgba(249,115,22,0.25) 90%,transparent)',transformOrigin:'top',boxShadow:'0 0 8px rgba(249,115,22,0.15)' }}
        initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true, margin:'-100px' }}
        transition={{ duration:1.2, ease:[0.16,1,0.3,1] }}
      />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity:0, y:14, filter:'blur(6px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }}
            viewport={{ once:true }} transition={{ duration:0.45 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 badge-glow"
            style={{ background:'var(--bg-badge)', border:'1px solid var(--border-badge)' }}
          >
            <span className="text-xs font-medium uppercase tracking-wide" style={{ color:'var(--accent-mid)' }}>How It Works</span>
          </motion.div>

          <AnimatedHeadingInView
            lines={[
              { text:'Four Steps to',     className:'glow-heading' },
              { text:'Verified Identity', className:'cta-dim'      },
            ]}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily:'var(--font-display)' } as React.CSSProperties}
            baseDelay={0.05} stagger={0.09}
          />
        </div>

        <div className="space-y-6">
          {steps.map((step,i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, x:i%2===0 ? -28 : 28, y:10, filter:'blur(6px)' }}
              whileInView={{ opacity:1, x:0, y:0, filter:'blur(0px)' }}
              viewport={{ once:true, margin:'-50px' }}
              transition={{ duration:0.6, delay:i*0.12, ease:[0.16,1,0.3,1] }}
              className="relative"
            >
              <div
                className="flex gap-6 p-6 rounded-2xl group card-hover-glow transition-all duration-300"
                style={{ background:'var(--bg-card)', border:'1px solid var(--border-base)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-card-hover)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-hover)'; (e.currentTarget as HTMLElement).style.transform='scale(1.01)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='var(--bg-card)'; (e.currentTarget as HTMLElement).style.borderColor='var(--border-base)'; (e.currentTarget as HTMLElement).style.transform='scale(1)'; }}
              >
                <motion.div
                  className="flex flex-col items-center gap-3 shrink-0"
                  initial={{ opacity:0, scale:0.5 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
                  transition={{ duration:0.45, delay:i*0.12+0.15, ease:[0.34,1.56,0.64,1] }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background:step.bg, border:`1px solid ${step.border}`, boxShadow:`0 0 16px ${step.color}25,0 0 32px ${step.color}10` }}
                  >
                    <div style={{ color:step.color, filter:`drop-shadow(0 0 4px ${step.color}80)` }}>{step.icon}</div>
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color:`${step.color}90` }}>{step.number}</span>
                </motion.div>

                <motion.div
                  className="flex-1 pt-1"
                  initial={{ opacity:0, y:8, filter:'blur(4px)' }} whileInView={{ opacity:1, y:0, filter:'blur(0px)' }} viewport={{ once:true }}
                  transition={{ duration:0.45, delay:i*0.12+0.25 }}
                >
                  <h3 className="text-lg font-semibold mb-2" style={{ fontFamily:'var(--font-display)', color:'var(--text-primary)' }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color:'var(--text-secondary)' }}>{step.description}</p>
                </motion.div>
              </div>

              {i < steps.length-1 && (
                <motion.div
                  className="absolute bottom-0 left-9 w-px h-6 translate-y-full"
                  initial={{ scaleY:0 }} whileInView={{ scaleY:1 }} viewport={{ once:true }}
                  transition={{ duration:0.3, delay:i*0.12+0.4, ease:'easeOut' }}
                  style={{ background:`linear-gradient(to bottom,${step.color}55,transparent)`, transformOrigin:'top', boxShadow:`0 0 6px ${step.color}30` }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
