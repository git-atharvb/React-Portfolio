import { motion, useReducedMotion } from 'framer-motion';

const MotionDiv = motion.div;

function ScrollReveal({ children, className = '', delay = 0, blur = true }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <MotionDiv
      className={className}
      initial={{ opacity: 0, y: 24, filter: blur ? 'blur(10px)' : 'none' }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    >
      {children}
    </MotionDiv>
  );
}

export default ScrollReveal;
