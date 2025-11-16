'use client';

import { motion, type HTMLMotionProps, type Variants } from 'framer-motion';
import { forwardRef } from 'react';

/**
 * Pre-configured animation variants for consistent UX
 */

// Fade in from opacity 0 to 1
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Slide up with fade
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
};

// Slide down with fade
export const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

// Scale up from center
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

// Slide in from left
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

// Slide in from right
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
};

// Stagger children animation
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

/**
 * Pre-configured animated components
 */

interface AnimatedProps extends HTMLMotionProps<'div'> {
  variant?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'slideLeft' | 'slideRight';
  delay?: number;
}

const variantMap = {
  fadeIn,
  slideUp,
  slideDown,
  scaleIn,
  slideLeft,
  slideRight,
};

/**
 * Animated wrapper component
 * Usage: <Animated variant="slideUp">content</Animated>
 */
export const Animated = forwardRef<HTMLDivElement, AnimatedProps>(
  ({ variant = 'fadeIn', delay = 0, children, ...props }, ref) => {
    const variants = variantMap[variant];

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        transition={{ delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Animated.displayName = 'Animated';

/**
 * Animated card with hover effect
 */
interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  hoverScale?: number;
}

export const AnimatedCard = forwardRef<HTMLDivElement, AnimatedCardProps>(
  ({ hoverScale = 1.02, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: hoverScale, transition: { duration: 0.2 } }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedCard.displayName = 'AnimatedCard';

/**
 * Animated list container with stagger
 */
interface AnimatedListProps extends HTMLMotionProps<'div'> {
  stagger?: number;
}

export const AnimatedList = forwardRef<HTMLDivElement, AnimatedListProps>(
  ({ stagger = 0.1, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: stagger,
              delayChildren: 0.1,
            },
          },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedList.displayName = 'AnimatedList';

/**
 * Animated list item
 */
export const AnimatedListItem = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedListItem.displayName = 'AnimatedListItem';

/**
 * Animated button with press effect
 */
export const AnimatedButton = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'>>(
  ({ children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.1 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = 'AnimatedButton';

/**
 * Animated modal/dialog backdrop
 */
export const AnimatedBackdrop = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedBackdrop.displayName = 'AnimatedBackdrop';

/**
 * Animated page transition wrapper
 */
export const AnimatedPage = forwardRef<HTMLDivElement, HTMLMotionProps<'div'>>(
  ({ children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedPage.displayName = 'AnimatedPage';
