export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } }
};

export const modal3DVariants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    scale: 0.9, 
    rotateX: 15, 
    rotateY: -10, 
    perspective: 1000 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0, 
    rotateY: 0, 
    transition: { type: 'spring' as const, damping: 20, stiffness: 120 } 
  }
};
