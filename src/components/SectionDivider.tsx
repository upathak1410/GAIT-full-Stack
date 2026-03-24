import { motion } from 'framer-motion';

export default function SectionDivider({ dim = false }: { dim?: boolean }) {
  return (
    <motion.div
      initial={{ opacity:0, scaleX:0, filter:'blur(4px)' }}
      whileInView={{ opacity:1, scaleX:1, filter:'blur(0px)' }}
      viewport={{ once:true, margin:'-20px' }}
      transition={{ duration:0.9, ease:[0.16,1,0.3,1] }}
      className="section-divider mx-auto"
      style={{ maxWidth: dim ? '60%' : '80%', opacity: dim ? 0.45 : 0.75, transformOrigin:'center' }}
    />
  );
}
