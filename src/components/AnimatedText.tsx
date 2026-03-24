import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  lines: { text: string; className?: string }[];
  className?: string;
  style?: React.CSSProperties;
  baseDelay?: number;
  stagger?: number;
  tag?: 'h1' | 'h2' | 'h3';
}

/** Scroll-triggered word-by-word heading with blur-in */
export function AnimatedHeadingInView({
  lines, className = '', style, baseDelay = 0, stagger = 0.07, tag: Tag = 'h2',
}: AnimatedHeadingProps) {
  let gi = 0;
  const lineWords = lines.map(line => {
    const words = line.text.split(' ');
    const indexed = words.map(word => ({ word, index: gi++ }));
    return { indexed, className: line.className };
  });

  return (
    <Tag className={className} style={style}>
      {lineWords.map((line, li) => (
        <span key={li} className="block">
          {line.indexed.map(({ word, index }) => (
            <motion.span
              key={index}
              initial={{ opacity:0, y:18, filter:'blur(6px)' }}
              whileInView={{
                opacity:1, y:0, filter:'blur(0px)',
                transition: {
                  duration: 0.55,
                  delay: baseDelay + index * stagger,
                  ease: [0.16,1,0.3,1] as [number,number,number,number],
                },
              }}
              viewport={{ once:true, margin:'-60px' }}
              className={`inline-block mr-[0.25em] ${line.className ?? ''}`}
            >{word}</motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** On-mount heading (used in Hero) */
export function AnimatedHeading({
  lines, className = '', baseDelay = 0, stagger = 0.08, tag: Tag = 'h1',
}: AnimatedHeadingProps) {
  let gi = 0;
  const lineWords = lines.map(line => {
    const words = line.text.split(' ');
    const indexed = words.map(word => ({ word, index: gi++ }));
    return { indexed, className: line.className };
  });
  return (
    <Tag className={className}>
      {lineWords.map((line, li) => (
        <span key={li} className="block">
          {line.indexed.map(({ word, index }) => (
            <motion.span
              key={index}
              initial={{ opacity:0, y:22, filter:'blur(6px)' }}
              animate={{
                opacity:1, y:0, filter:'blur(0px)',
                transition: {
                  duration: 0.55,
                  delay: baseDelay + index * stagger,
                  ease: [0.16,1,0.3,1] as [number,number,number,number],
                },
              }}
              className={`inline-block mr-[0.25em] ${line.className ?? ''}`}
            >{word}</motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

export const fadeUpItem = {
  hidden: { opacity:0, y:20, filter:'blur(4px)' },
  visible: { opacity:1, y:0, filter:'blur(0px)', transition:{ duration:0.55, ease:[0.16,1,0.3,1] } },
};

export const staggerContainer = {
  hidden: {},
  visible: { transition:{ staggerChildren:0.1 } },
};

export const wordVariants = {
  hidden: { opacity:0, y:24, filter:'blur(4px)' },
  visible: (i: number) => ({
    opacity:1, y:0, filter:'blur(0px)',
    transition: { duration:0.55, delay:i*0.08, ease:[0.16,1,0.3,1] },
  }),
};
